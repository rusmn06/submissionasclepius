const predictClassification = require('./inferenceService');
const crypto = require('crypto');
const { storeData, getData } = require('./storeData');

// predict
async function postPredictHandler(request, h) {
    
        const { image } = request.payload;
        const { model } = request.server.app;

	try {        
        const { label, suggestion } = await predictClassification(model, image);
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
                message: 'Model is predicted successfully',
                data
                });
                response.code(201);
                return response;
	}catch {
		return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
	}
};

// history
async function getHistoriesHandler(request, h) {
    try {
        const histories = await getData();
        return h.response({
            status: 'success',
            data: histories,
        }).code(200);
    } catch (error) {
        console.error('Error fetching histories:', error);
        return h.response({
            status: 'fail',
            message: 'Gagal mengambil riwayat prediksi',
        }).code(500);
    }
};
   
  module.exports = { postPredictHandler, getHistoriesHandler };