'use strict';

const gulp = require('gulp');
const gls = require('gulp-live-server');

module.exports = () => {
  const server = gls.new('./src/server/app.js');
  server.start();

  gulp.task('restart-server', () => {
    server.start();
  });

  // Used to detect changes in the client and auto updates it
  gulp.watch(['src/client/**/*'],
    ['buildify']);

  gulp.watch([
    'src/server/**/*',
  ], ['restart-server']);
};
