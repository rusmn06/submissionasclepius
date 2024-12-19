const tf = require('@tensorflow/tfjs-node');

const predict = async (model, image) => {
  const tensor = tf.node
    .decodeImage(image._data, 3)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidence = Math.max(...score);

  return confidence >= 0.5 ? 'Cancer' : 'Non-cancer';
};

module.exports = { predict };