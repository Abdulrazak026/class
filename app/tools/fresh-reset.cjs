const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, getDocs, collection, updateDoc, deleteDoc } = require('firebase/firestore');
const { createHash } = require('crypto');
const cfg = { apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ', authDomain: 'class-e74d9.firebaseapp.com', projectId: 'class-e74d9' };
const db = getFirestore(initializeApp(cfg));
(async () => {
  // Reset both access codes
  for (const code of ['DACAMP-2026', 'DATACM-2026']) {
    const hash = createHash('sha256').update(code.toLowerCase()).digest('hex');
    await updateDoc(doc(db, 'accessCodes', hash), { status: 'available', deviceId: null, userId: null, usedAt: null });
    console.log(code + ' reset to available');
  }
  // Delete all userRegistry docs
  const r = await getDocs(collection(db, 'userRegistry'));
  for (const d of r.docs) {
    await deleteDoc(d.ref);
    console.log('Deleted userRegistry/' + d.id);
  }
  console.log('Done — both codes available, userRegistry empty');
})();
