const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, getDocs, collection } = require('firebase/firestore');
const { createHash } = require('crypto');

const cfg = {
  apiKey: 'AIzaSyC_hRndzqeJtx5iJpfFIqQTzEkwWS_ecZQ',
  authDomain: 'class-e74d9.firebaseapp.com',
  projectId: 'class-e74d9',
};
const db = getFirestore(initializeApp(cfg));

async function main() {
  for (const c of ['DACAMP-2026', 'DATACM-2026']) {
    const h = createHash('sha256').update(c.toLowerCase()).digest('hex');
    const d = await getDoc(doc(db, 'accessCodes', h));
    console.log(c + ': ' + (d.exists() ? d.data().status : 'NOT FOUND'));
  }
  const r = await getDocs(collection(db, 'userRegistry'));
  console.log('userRegistry docs:', r.size);
  r.forEach((d) => console.log('  ' + d.id + '  ' + JSON.stringify(d.data())));
}
main().catch((e) => console.error(e.message));
