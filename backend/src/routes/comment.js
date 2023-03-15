const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/:postId', controllers.getAllCommentsByPostId);
routes.post('/', controllers.addCommentToPost);
routes.delete('/', controllers.deleteComment);

module.exports = routes;
