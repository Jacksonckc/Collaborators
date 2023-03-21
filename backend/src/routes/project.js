const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/', controllers.getAllProjects);
routes.post('/', controllers.addProject);

module.exports = routes;
