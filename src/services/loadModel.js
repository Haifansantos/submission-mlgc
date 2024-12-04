// Import TensorFlow dan dotenv
const tf = require('@tensorflow/tfjs-node');
require('dotenv').config(); // Memuat file .env

async function loadModel() {
    if (!process.env.MODEL_URL) {
        throw new Error('MODEL_URL is not defined in the environment variables');
    }
    return tf.loadGraphModel(process.env.MODEL_URL); // Menggunakan URL dari .env
}

module.exports = loadModel;
