import { db, hasFirebaseConfig } from './config';
import {
  collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, limit, serverTimestamp, Timestamp, getDocs, where,
} from 'firebase/firestore';

// --- Device ID & User Registry ---

const DEVICE_ID_KEY = 'device-id';
const USER_ID_KEY = 'assigned-user-id';

export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export function getMyUserId(): number | null {
  const raw = localStorage.getItem(USER_ID_KEY);
  return raw ? parseInt(raw, 10) : null;
}

export async function registerDevice(): Promise<number> {
  const existing = getMyUserId();
  if (existing) return existing;

  if (!hasFirebaseConfig || !db) {
    localStorage.setItem(USER_ID_KEY, '1');
    return 1;
  }

  const deviceId = getDeviceId();

  try {
    const user1Snap = await getDoc(doc(db, 'userRegistry', 'user1'));
    const user2Snap = await getDoc(doc(db, 'userRegistry', 'user2'));

    if (user1Snap.exists() && user1Snap.data().deviceId === deviceId) {
      localStorage.setItem(USER_ID_KEY, '1');
      return 1;
    }
    if (user2Snap.exists() && user2Snap.data().deviceId === deviceId) {
      localStorage.setItem(USER_ID_KEY, '2');
      return 2;
    }

    if (!user1Snap.exists()) {
      await setDoc(doc(db, 'userRegistry', 'user1'), { deviceId, registeredAt: serverTimestamp() });
      localStorage.setItem(USER_ID_KEY, '1');
      return 1;
    }
    if (!user2Snap.exists()) {
      await setDoc(doc(db, 'userRegistry', 'user2'), { deviceId, registeredAt: serverTimestamp() });
      localStorage.setItem(USER_ID_KEY, '2');
      return 2;
    }

    localStorage.setItem(USER_ID_KEY, '1');
    return 1;
  } catch {
    localStorage.setItem(USER_ID_KEY, '1');
    return 1;
  }
}

// --- Progress Sync ---

export interface ProgressData {
  tasks: string[];
  userCode?: string;
}

export async function syncUserProgress(userId: number, completedTasks: string[], userCode?: string) {
  if (!hasFirebaseConfig || !db) return;
  try {
    await setDoc(doc(db, 'progress', `user${userId}`), {
      completedTasks,
      userCode: userCode || '',
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Progress sync failed:', e);
  }
}

export function subscribeToProgress(
  userId: number,
  onData: (data: ProgressData) => void,
  onError?: (e: Error) => void
) {
  if (!hasFirebaseConfig || !db) {
    onData({ tasks: [] });
    return () => {};
  }
  const unsub = onSnapshot(
    doc(db, 'progress', `user${userId}`),
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onData({ tasks: data.completedTasks || [], userCode: data.userCode || undefined });
      } else {
        onData({ tasks: [] });
      }
    },
    (err) => { if (onError) onError(err); }
  );
  return unsub;
}

// --- Chat ---

export interface ChatMessage {
  user: string;
  text: string;
  time: string;
  createdAt?: any;
}

export async function sendChatMessage(msg: ChatMessage) {
  if (!hasFirebaseConfig || !db) {
    let existing: ChatMessage[] = [];
    try { existing = JSON.parse(localStorage.getItem('study-chat') || '[]'); } catch { existing = []; }
    existing.push(msg);
    localStorage.setItem('study-chat', JSON.stringify(existing));
    return;
  }
  try {
    await addDoc(collection(db, 'chat'), {
      ...msg,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Chat send failed:', e);
  }
}

export function subscribeToChat(
  onMessages: (msgs: ChatMessage[]) => void,
  onError?: (e: Error) => void
) {
  if (!hasFirebaseConfig || !db) {
    let saved: ChatMessage[] = [];
    try { saved = JSON.parse(localStorage.getItem('study-chat') || '[]'); } catch { saved = []; }
    onMessages(saved);
    return () => {};
  }
  const q = query(collection(db, 'chat'), orderBy('createdAt', 'asc'), limit(200));
  const unsub = onSnapshot(q, (snap) => {
    const msgs: ChatMessage[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data && typeof data === 'object' && typeof data.text === 'string' && typeof data.user === 'string') {
        msgs.push({ text: data.text.slice(0, 10000), user: data.user.slice(0, 100), time: typeof data.time === 'string' ? data.time.slice(0, 100) : '' });
      }
    });
    onMessages(msgs);
  }, (err) => { if (onError) onError(err); });
  return unsub;
}

// --- Topic Comments ---

export interface TopicComment {
  user: string;
  text: string;
  time: string;
  topicId: string;
  createdAt?: any;
}

export async function addTopicComment(comment: TopicComment) {
  if (!hasFirebaseConfig || !db) {
    fallbackAddTopicComment(comment);
    return;
  }
  try {
    await addDoc(collection(db, 'topicComments'), {
      ...comment,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Comment add failed, falling back to localStorage:', e);
    fallbackAddTopicComment(comment);
  }
}

function fallbackAddTopicComment(comment: TopicComment) {
  const key = `topic-comments-${comment.topicId}`;
  let existing: TopicComment[] = [];
  try { existing = JSON.parse(localStorage.getItem(key) || '[]'); } catch { existing = []; }
  existing.push({ user: comment.user, text: comment.text, time: comment.time, topicId: comment.topicId });
  localStorage.setItem(key, JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent('topic-comment-added', { detail: comment.topicId }));
}

function subscribeLocalTopicComments(
  topicId: string,
  onComments: (comments: TopicComment[]) => void
): () => void {
  const key = `topic-comments-${topicId}`;
  let saved: TopicComment[] = [];
  try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch { saved = []; }
  onComments(saved);
  const handler = () => {
    let updated: TopicComment[] = [];
    try { updated = JSON.parse(localStorage.getItem(key) || '[]'); } catch { updated = []; }
    onComments(updated);
  };
  window.addEventListener('topic-comment-added', handler);
  return () => window.removeEventListener('topic-comment-added', handler);
}

export function subscribeToTopicComments(
  topicId: string,
  onComments: (comments: TopicComment[]) => void,
  onError?: (e: Error) => void
): () => void {
  if (!hasFirebaseConfig || !db) {
    return subscribeLocalTopicComments(topicId, onComments);
  }
  const q = query(
    collection(db, 'topicComments'),
    where('topicId', '==', topicId),
    orderBy('createdAt', 'asc'),
    limit(200)
  );
  const cleanups: (() => void)[] = [];
  const unsub = onSnapshot(q, (snap) => {
    const comments: TopicComment[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data && typeof data === 'object' && typeof data.text === 'string' && typeof data.user === 'string' && typeof data.topicId === 'string') {
        comments.push({ text: data.text.slice(0, 5000), user: data.user.slice(0, 100), time: typeof data.time === 'string' ? data.time.slice(0, 100) : '', topicId: data.topicId });
      }
    });
    onComments(comments);
  }, (err) => {
    console.warn('Firebase comment subscription failed, falling back to localStorage:', err);
    if (onError) onError(err);
    unsub();
    cleanups.push(subscribeLocalTopicComments(topicId, onComments));
  });
  cleanups.push(unsub);
  return () => cleanups.forEach(fn => fn());
}
