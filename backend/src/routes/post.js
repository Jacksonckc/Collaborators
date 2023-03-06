const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/all', controllers.getAllPosts);

routes.get('/', controllers.getUserPosts);
routes.post('/', controllers.createPost);
routes.put('/:postId', controllers.updatePost);
routes.delete('/:postId', controllers.deletePost);

module.exports = routes;
