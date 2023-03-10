const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/suggested', controllers.getSuggestedConnections);
routes.post('/', controllers.sendConnectionRequest);
routes.put('/:receiverId', controllers.acceptConnectionRequest);
routes.delete('/:receiverId', controllers.cancelConnectionRequest);
routes.get('/', controllers.getAllConnections);

module.exports = routes;
