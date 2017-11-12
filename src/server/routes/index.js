'use strict';

const index = require('./home');
const sources = require('./sources');

const routes = (app) => {
  app.use('/', index);
  app.use('/sources', sources);
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
