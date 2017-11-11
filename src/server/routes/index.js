'use strict';

const index = require('./home');

const routes = (app) => {
  app.use('/', index);
};

const errorRoutes = (app) => {
  // 404 Route handling - Keep at the bottom
  app.get('*', (req, res) => {
    res.sendStatus('404');
  });
};

module.exports = {
  routes,
  errorRoutes
};
