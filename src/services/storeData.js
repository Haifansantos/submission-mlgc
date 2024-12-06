const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  try {
    const db = new Firestore({
      projectId: 'submissionmlgc-haifan', // ID Project Google Cloud
      databaseId: 'datasubmi',     // Nama database
    });

    console.log('Firestore initialized with database:', db.databaseId);

    const predictCollection = db.collection('prediction');
    await predictCollection.doc(id).set(data);
    console.log(`Data stored successfully with ID: ${id}`);
  } catch (error) {
    console.error('Error storing data to Firestore:', error);
    throw error;
  }
} 

module.exports = storeData;
  