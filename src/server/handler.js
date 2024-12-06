const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
 
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}
 
async function getPredictHistoriesHandler(request, h) {
  try {
    const db = new Firestore({
      projectId: 'submissionmlgc-haifan',
    });

    const predictionsCollection = db.collection('prediction');
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