const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/:postId', controllers.getLikeByPostId);
routes.get('/all/:postId', controllers.getPostLikeCountByPostId);
routes.post('/', controllers.likePost);
routes.delete('/', controllers.unLikePost);

module.exports = routes;
