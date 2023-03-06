const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/suggested', controllers.getSuggestedConnections);
routes.post('/', controllers.sendConnectionRequest);

module.exports = routes;
