const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();
console.log('Firestore project ID:', db.projectId);