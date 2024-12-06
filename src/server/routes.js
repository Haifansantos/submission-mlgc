const { postPredictHandler, getPredictHistoriesHandler } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data', 
        multipart: true,
        maxBytes: 1000000
      }
    }
  },
  {
    method: 'GET',
    path: '/history',
    handler: getPredictHistoriesHandler
      }
      
  
]
 
module.exports = routes;