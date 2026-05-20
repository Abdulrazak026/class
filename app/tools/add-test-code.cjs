const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const { createHash } = require('crypto');
const cfg = { apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ', authDomain: 'class-e74d9.firebaseapp.com', projectId: 'class-e74d9' };
const db = getFirestore(initializeApp(cfg));
(async () => {
  const code = 'TEST-1234';
  const hash = createHash('sha256').update(code.toLowerCase()).digest('hex');
  console.log('Code:', code);
  console.log('Hash:', hash);
  const existing = await getDoc(doc(db, 'accessCodes', hash));
  if (existing.exists()) {
    console.log('Already exists:', JSON.stringify(existing.data()));
  } else {
    await setDoc(doc(db, 'accessCodes', hash), { status: 'available', deviceId: null, userId: null, usedAt: null });
    console.log('Created TEST-1234 as available');
  }
})();
