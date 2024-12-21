const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore({
    projectId: 'submissionmlgc-denirusmana',
    databaseId: 'asclepius',
  });
 
  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}
 
module.exports = storeData;