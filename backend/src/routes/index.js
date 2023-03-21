const express = require('express');
const swaggerUi = require('swagger-ui-express');

const user = require('./user');
const project = require('./project');
const swaggerDocs = require('../swagger.json');
const { getAuth } = require('../middleware/auth');

const routes = express.Router();

routes.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
routes.use('/user', user);
routes.use('/project', getAuth, project);

// all the other routes should use getAuth.

module.exports = routes;
