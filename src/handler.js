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
        
        const { label, suggestion } = await predictClassification(model, image._data);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        
        const data = {
                id,
                result: label,
                suggestion,
                createdAt,
            };
            await storeData(id, data);
            
            const response = h.response({
                status: 'success',
                message: 'Model is predicted successfully.',
                data
                });
                response.code(201);
                return response;

}
   
  module.exports = postPredictHandler;