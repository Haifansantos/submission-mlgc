const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;  // Ambil image dari payload
  const { model } = request.server.app;

  // Pastikan image ada dan ukurannya sesuai dengan yang diinginkan
  const MAX_IMAGE_SIZE = 1000000; // 1MB dalam byte
  const imageSize = Buffer.byteLength(image, 'base64');

  if (imageSize > MAX_IMAGE_SIZE) {
    return h.response({
      status: 'fail',
      message: `Payload content length greater than maximum allowed: ${MAX_IMAGE_SIZE}`
    }).code(413);  // Status code 413 untuk Payload Too Large
  }

  try {
    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result: label,
      suggestion,
      createdAt
    };

    // Simpan data ke Firestore
    await storeData(id, data);

    return h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    }).code(201);
  } catch (error) {
    console.error('Error during prediction:', error);
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi'
    }).code(400); // Status code 400 untuk Bad Request
  }
}

async function getPredictHistoriesHandler(request, h) {
  try {
    const db = new Firestore({
      projectId: 'submissionmlgc-haifan',
    });

    const predictionsCollection = db.collection('predictions');  // Pastikan koleksi menggunakan 'predictions'
    const snapshot = await predictionsCollection.get();
    
    const histories = snapshot.docs.map((doc) => ({
      id: doc.id,
      history: doc.data()
    }));

    return h.response({ 
      status: 'success', 
      data: histories 
    }).code(200);
  } catch (error) {
    console.error('Error fetching prediction histories:', error);
    return h.response({
      status: 'fail',
      message: 'Gagal mengambil riwayat prediksi'
    }).code(500);
  }
}

module.exports = { postPredictHandler, getPredictHistoriesHandler };
