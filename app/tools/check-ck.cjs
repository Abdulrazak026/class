const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const cfg = { apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ', authDomain: 'class-e74d9.firebaseapp.com', projectId: 'class-e74d9' };
const db = getFirestore(initializeApp(cfg));
(async () => {
  const d = await getDoc(doc(db, 'config', 'contentKey'));
  console.log('config/contentKey:', d.exists() ? JSON.stringify(d.data()) : 'NOT FOUND');
  if (d.exists()) console.log('  key value:', JSON.stringify(d.data().key));
})();
