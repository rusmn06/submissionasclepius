const tf = require('@tensorflow/tfjs-node');
 
async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/asclepius-models-2024/model-in-prod/model.json');
}
 
module.exports = loadModel;