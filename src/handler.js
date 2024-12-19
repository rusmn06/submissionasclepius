const inference = require('./inference');
const dataService = require('./data');
const { v4: uuidv4 } = require('uuid');

const handlePredict = async (request, h) => {
  try {
    const { payload } = request;
    const imageFile = payload.image; // Field name for file

    // Validate file size
    if (imageFile.bytes > 1000000) {
      return h.response({
        status: 'fail',
        message: 'Payload content length greater than maximum allowed: 1000000',
      }).code(413);
    }

    // Perform inference
    const predictionResult = await inference.predict(imageFile);
    const predictionId = uuidv4();
    const suggestionMessage = predictionResult === 'Cancer' 
      ? 'Segera periksa ke dokter!' 
      : 'Penyakit kanker tidak terdeteksi.';

    const predictionData = {
      id: predictionId,
      result: predictionResult,
      suggestion: suggestionMessage,
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore
    await dataService.savePrediction(predictionData);

    return h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data: predictionData,
    }).code(200);

  } catch (error) {
    console.error(error);
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi',
    }).code(400);
  }
};

module.exports = { handlePredict };