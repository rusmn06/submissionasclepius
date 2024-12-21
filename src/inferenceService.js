const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
    
    try {
        const tensor = tf.node
            .decodeImage(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
        const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';

        const suggestion = label === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
        console.log('Prediction result:', { confidenceScore, label, suggestion });

        return { label, suggestion };
    } catch (error) {
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
    }
}

module.exports = predictClassification;