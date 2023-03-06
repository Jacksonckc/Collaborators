const routes = require('express').Router();

const controllers = require('../controllers');
const { getAuth } = require('../middleware/auth');
const post = require('./post');
const connection = require('./connection');

routes.get('/', getAuth, controllers.getUser);
routes.post('/', controllers.addUser);
routes.put('/', getAuth, controllers.changeUserInfo);
routes.delete('/', getAuth, controllers.deleteUser);
routes.put('/password', getAuth, controllers.updateUserPassword);
routes.post('/login', controllers.loginUser);
routes.get('/all', getAuth, controllers.getUsers);

routes.use('/post', getAuth, post); // another route
routes.use('/connection', getAuth, connection); // another route

routes.get('/:userId', getAuth, controllers.getOtherUser);

module.exports = routes;
