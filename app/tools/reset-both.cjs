const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, getDoc } = require('firebase/firestore');
const { createHash } = require('crypto');
const cfg = { apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ', authDomain: 'class-e74d9.firebaseapp.com', projectId: 'class-e74d9' };
const db = getFirestore(initializeApp(cfg));
(async () => {
  const codes = ['DACAMP-2026', 'DATACM-2026'];
  for (const code of codes) {
    const hash = createHash('sha256').update(code.toLowerCase()).digest('hex');
    const docRef = doc(db, 'accessCodes', hash);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, { status: 'available', deviceId: null, userId: null, usedAt: null });
      console.log(code + ' (' + hash.slice(0, 12) + '...) reset to available');
    } else {
      console.log(code + ': NOT FOUND in Firestore');
    }
  }
})();
