const{Firestore} = require('@google-cloud/firestore');
 
async function storeData(id, data) {
    // Sesuaikan databaseId dengan id dari instances firestorenya
    const db = new Firestore({databaseId: "(default)"});
   
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
  }
   
  module.exports = storeData;