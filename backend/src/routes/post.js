const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/');
routes.post('/', controllers.createPost);
routes.put('/');
routes.delete('/');
routes.get('/all', controllers.getAllPosts);

module.exports = routes;
