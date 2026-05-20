const { initializeApp } = require('firebase/app');
const { getFirestore, getDocs, collection } = require('firebase/firestore');
const cfg = { apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ', authDomain: 'class-e74d9.firebaseapp.com', projectId: 'class-e74d9' };
const db = getFirestore(initializeApp(cfg));
(async () => {
  const d = await getDocs(collection(db, 'accessCodes'));
  console.log('Total:', d.size);
  d.forEach(r => console.log('  docId:' + r.id + '  ' + JSON.stringify(r.data())));
})();
