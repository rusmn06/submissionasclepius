const { Firestore } = require('@google-cloud/firestore');

const storeData = async (id, data) => {
  const db = new Firestore();
  const predictionsCollection = db.collection('predictions');
  await predictionsCollection.doc(id).set(data);
};

module.exports = { storeData };