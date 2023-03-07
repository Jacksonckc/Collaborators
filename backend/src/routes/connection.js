const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/suggested', controllers.getSuggestedConnections);
routes.post('/', controllers.sendConnectionRequest);
routes.delete('/:receiverId', controllers.cancelConnectionRequest);

module.exports = routes;
