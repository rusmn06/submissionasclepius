const inference = require('./inference');
const dataStore = require('./dataStore');
const crypto = require('crypto');

const handlePredict = async (request, h) => {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    if (image._data.length > 1000000) {
      return h.response({
        status: 'fail',
        message: 'Payload content length greater than maximum allowed: 1000000',
      }).code(413);
    }

    const result = await inference.predict(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const suggestion = result === 'Cancer'
      ? 'Segera periksa ke dokter!'
      : 'Penyakit kanker tidak terdeteksi.';

    const predictionData = {
      id,
      result,
      suggestion,
      createdAt,
    };

    await dataStore.storeData(id, predictionData);

    return h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data: predictionData,
    }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi',
    }).code(400);
  }
};

module.exports = { handlePredict };