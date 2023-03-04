const routes = require('express').Router();
const controllers = require('../controllers');
const { getAuth } = require('../middleware/auth');

routes.get('/', getAuth, controllers.getUser); // Only available when you have the token
routes.post('/', controllers.addUser);
routes.put('/', getAuth, controllers.changeUserInfo); // this will still need to be changed, the valiation
routes.delete('/', getAuth, controllers.deleteUser);
routes.put('/password', getAuth, controllers.updateUserPassword);
routes.post('/login', controllers.loginUser); // This will return a token to the frontend
routes.get('/all', getAuth, controllers.getUsers); // This should be a protective path for only admins

module.exports = routes;
