const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: 'https://cocktail-adfa8.firebaseio.com'
});

const db = admin.firestore();

db.collection('userdata').get()
  .then((snapshot) => {
    const data = snapshot.docs.map(doc => doc.data());
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.log('Error getting documents: ', error);
  });
