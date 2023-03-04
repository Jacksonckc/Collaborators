const express = require('express');
const swaggerUi = require('swagger-ui-express');

const user = require('./user');
const swaggerDocs = require('../swagger.json');

const routes = express.Router();

routes.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
routes.use('/user', user);

module.exports = routes;
