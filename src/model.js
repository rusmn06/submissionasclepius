const tf = require('@tensorflow/tfjs-node');

let model;

async function loadModel() {
  try {
      const model = await tf.loadLayersModel('https://storage.googleapis.com/asclepius-models-2024/model-in-prod/model.json');
      console.log(model.summary());
  } catch (err) {
      console.error('Error loading model:', err);
  }
};

module.exports = loadModel;