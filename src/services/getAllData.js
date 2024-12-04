const { Firestore } = require('@google-cloud/firestore');

async function getData() {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    
    const allData = await predictCollection.get();
    return allData;
}


module.exports = getData;