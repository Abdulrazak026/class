import { db, hasFirebaseConfig } from './config';
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { getDeviceId } from './services';

const CODES_COLLECTION = 'accessCodes';
const CONFIG_COLLECTION = 'config';
const CONTENT_KEY_DOC = 'contentKey';

export interface AccessCodeStatus {
  status: 'available' | 'used' | 'revoked';
  deviceId: string | null;
  userId: number | null;
}

export interface UnlockResult {
  success: boolean;
  message: string;
  userId?: number;
  contentKey?: string;
}

export async function checkAccessCode(codeHash: string): Promise<UnlockResult> {
  if (!hasFirebaseConfig || !db) {
    return { success: false, message: 'No internet connection. Please connect to the internet to activate.' };
  }

  try {
    const codeRef = doc(db, CODES_COLLECTION, codeHash);
    const codeSnap = await getDoc(codeRef);

    if (!codeSnap.exists()) {
      return { success: false, message: 'Invalid access code.' };
    }

    const data = codeSnap.data() as AccessCodeStatus;
    const deviceId = getDeviceId();

    if (data.status === 'revoked') {
      return { success: false, message: 'Your access has been revoked. Contact the owner for a new code.' };
    }

    if (data.status === 'used') {
      if (data.deviceId === deviceId) {
        // Same device re-verifying — allow
        const keySnap = await getDoc(doc(db, CONFIG_COLLECTION, CONTENT_KEY_DOC));
        return {
          success: true,
          message: 'Welcome back!',
          userId: data.userId || 1,
          contentKey: keySnap.exists() ? keySnap.data().key : undefined,
        };
      }
      return { success: false, message: 'This code is already in use. Contact the owner for a new code.' };
    }

    // Code is available — claim it atomically
    const claimResult = await claimSlot(codeRef, deviceId, codeHash);
    if (!claimResult) {
      return { success: false, message: 'All user slots are full. Contact the owner.' };
    }

    const contentKey = claimResult.contentKey;

    return {
      success: true,
      message: 'Course unlocked!',
      userId,
      contentKey,
    };
  } catch (e: any) {
    if (e?.code === 'unavailable' || e?.name === 'FirebaseError' && e?.code?.includes('unavailable')) {
      return { success: false, message: 'No internet connection. Please connect to the internet to activate.' };
    }
    return { success: false, message: 'Connection error. Please check your internet and try again.' };
  }
}

async function claimSlot(codeRef: any, deviceId: string, codeHash: string): Promise<{ userId: number; contentKey?: string } | null> {
  if (!db) return null;
  try {
    const userId = await runTransaction(db, async (transaction) => {
      const registry1 = await transaction.get(doc(db, 'userRegistry', 'user1'));
      const registry2 = await transaction.get(doc(db, 'userRegistry', 'user2'));

      // If device already has a slot, return it
      if (registry1.exists() && registry1.data().deviceId === deviceId) return 1;
      if (registry2.exists() && registry2.data().deviceId === deviceId) return 2;

      // Try slot 1
      if (!registry1.exists()) {
        transaction.set(doc(db, 'userRegistry', 'user1'), { deviceId, registeredAt: serverTimestamp() });
        return 1;
      }
      // Try slot 2
      if (!registry2.exists()) {
        transaction.set(doc(db, 'userRegistry', 'user2'), { deviceId, registeredAt: serverTimestamp() });
        return 2;
      }

      return null; // both slots taken
    });

    if (!userId) return null;

    await updateDoc(codeRef, {
      status: 'used',
      deviceId,
      userId,
      usedAt: serverTimestamp(),
    });

    const keySnap = await getDoc(doc(db, CONFIG_COLLECTION, CONTENT_KEY_DOC));
    const contentKey = keySnap.exists() ? keySnap.data().key : undefined;

    return { userId, contentKey };
  } catch (e) {
    console.error('Slot claim error:', e);
    return null;
  }
}
