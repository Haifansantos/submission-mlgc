const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
  const db = new Firestore({
    projectId: 'submissionmlgc-haifan', // Pastikan Project ID benar
  });

  console.log('Firestore initialized for retrieving all data');

  try {
    const querySnapshot = await db.collection('predictions').get();

    if (querySnapshot.empty) {
      console.log('No data found');
      return [];
    }

    return querySnapshot.docs;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

module.exports = getAllData;