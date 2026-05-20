/**
 * Run this script once to set up Firestore with:
 * - Access codes (DACAMP-2026, DATACM-2026)
 * - Content encryption key
 *
 * Usage: node tools/init-firestore.mjs
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { createHash, randomBytes } from 'crypto';

const firebaseConfig = {
  apiKey: "AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ",
  authDomain: "class-e74d9.firebaseapp.com",
  projectId: "class-e74d9",
  storageBucket: "class-e74d9.firebasestorage.app",
  messagingSenderId: "1012450164648",
  appId: "1:1012450164648:web:edd7e2fb37fa0ba990679d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function sha256(str) {
  return createHash('sha256').update(str.toLowerCase()).digest('hex');
}

const CODES = ['DACAMP-2026', 'DATACM-2026'];
const CONTENT_KEY = 'DACAMP-2026'; // Must match generate-data-json.ts default

async function main() {
  console.log('=== Setting up Firestore ===\n');

  // 1. Add content key
  const keyRef = doc(db, 'config', 'contentKey');
  const keySnap = await getDoc(keyRef);
  if (!keySnap.exists()) {
    await setDoc(keyRef, { key: CONTENT_KEY });
    console.log(`[OK] config/contentKey → ${CONTENT_KEY}`);
  } else {
    console.log(`[SKIP] config/contentKey already exists (${keySnap.data().key})`);
  }

  // 2. Add access codes
  for (const code of CODES) {
    const hash = sha256(code);
    const ref = doc(db, 'accessCodes', hash);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        status: 'available',
        deviceId: null,
        userId: null,
        usedAt: null,
      });
      console.log(`[OK] accessCodes/${hash.slice(0,12)}… (code: ${code})`);
    } else {
      console.log(`[SKIP] accessCodes/${hash.slice(0,12)}… (${code}) — status: ${snap.data().status}`);
    }
  }

  console.log('\n=== Done ===');
  process.exit(0);
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
