const tf = require('@tensorflow/tfjs-node');

let model;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel(process.env.MODEL_URL);
  }
  return model;
};

module.exports = loadModel;