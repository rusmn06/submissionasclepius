const{Firestore} = require('@google-cloud/firestore');
 
async function storeData(id, data) {
    // Sesuaikan databaseId dengan id dari instances firestorenya
    const db = new Firestore({databaseId: "(default)"});
   
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
  }

async function getData() {
  const db = new Firestore({ databaseId: "(default)" });
  
  const predictCollection = db.collection('predictions');
  const snapshot = await predictCollection.get();
  const histories = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    histories.push({
      id: doc.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: data.id,
      },
    });
  });
  return histories;
};
   
  module.exports = { storeData, getData };