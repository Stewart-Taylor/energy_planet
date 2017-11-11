'use strict';

const gulp = require('gulp');

module.exports = () => {
  const start = () => {
    gulp.start('compile');
  };

  gulp.task('compile', [
    'buildify'
  ], () => {
    gulp.start('watch');
  });

  start();
};
