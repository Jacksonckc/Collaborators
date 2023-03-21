const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/', controllers.getAllProjects);
routes.post('/', controllers.addProject);
routes.delete('/', controllers.deleteProject);

module.exports = routes;
