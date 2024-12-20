const predictClassification = require('./inferenceService');
const crypto = require('crypto');
const storeData = require('./storeData');

async function postPredictHandler(request, h) {
    
        const { image } = request.payload;
        const { model } = request.server.app;

        if (!image) {
            return h.response({
                status: 'fail',
                message: 'No image uploaded',
            }).code(400);
        }

        if (image._data.length > 1048576) {
            return h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000',
            }).code(413);
        }
        try {
            
            const { confidenceScore, label, suggestion } = await predictClassification(model, image._data);

            const id = crypto.randomUUID();
            const createdAt = new Date().toISOString();

            const data = {
                id,
                result: label,
                suggestion,
                confidenceScore,
                createdAt,
            };
            
            await storeData(id, data);
            
            return h.response({
                status: 'success',
                message: 'Model is predicted successfully',
                data: {
                    id,
                    result: label,
                    suggestion,
                    createdAt,
                },
            }).code(200);
        } catch (error) {
            console.error('Error during prediction:', error.message);
            return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
            }).code(400);
        }
}
   
  module.exports = postPredictHandler;