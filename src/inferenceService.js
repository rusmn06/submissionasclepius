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

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new Error(`Terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;