const postPredictHandler = require('./handler');
 
const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1048576,
                output: 'stream',
                parse: true
            },
        },
    },
];
 
module.exports = routes;