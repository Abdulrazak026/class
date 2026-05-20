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
  // 1. Check all collections exist
  const collections = await getDocs(collection(db, 'accessCodes'));
  console.log('=== accessCodes collection ===');
  console.log('Total docs:', collections.size);
  collections.forEach(d => console.log('  ID:', d.id.slice(0,20)+'...', 'data:', JSON.stringify(d.data())));

  // 2. Test DACAMP-2026 hash lookup
  const code = 'DACAMP-2026';
  const hash = createHash('sha256').update(code.toLowerCase()).digest('hex');
  console.log('\n=== Testing code:', code, '===');
  console.log('Lowercase:', code.toLowerCase());
  console.log('Hash:', hash);
  
  const docRef = doc(db, 'accessCodes', hash);
  const snap = await getDoc(docRef);
  console.log('Document exists:', snap.exists());
  if (snap.exists()) {
    console.log('Document data:', JSON.stringify(snap.data()));
    console.log('Status:', snap.data().status);
  } else {
    // Try with a simpler lookup
    console.log('Document NOT found! Trying all docs to find match...');
    const all = await getDocs(collection(db, 'accessCodes'));
    all.forEach(d => {
      console.log('  Stored ID:', d.id);
      console.log('  Computed:', hash);
      console.log('  Match:', d.id === hash);
    });
  }
}
main().catch(e => console.error('ERROR:', e.message, e.code));
