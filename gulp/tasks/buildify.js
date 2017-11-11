'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const glob = require('glob');
const chalk = require('chalk');

/* nicer browserify errors */


function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.emit('end');
}
/* */

module.exports = (done) => {
  glob('src/client/main.js', (err, files) => {
    files.map((entry) => {
      const entryArr = entry.split('/');
      const sourcefile = entryArr[entryArr.length - 1];
      const bundler = browserify({
        entries: entry,
        debug: true,
        plugin: []
      });
      return bundler
        .transform('babelify', {
          // presets: ['es2015'],
          // plugins: [
          //   [
          //     'transform-es2015-classes',
          //     { loose: true }
          //   ],
          //   'transform-proto-to-assign'
          // ]
        })
        .bundle()
        .on('error', map_error)
        .pipe(source(sourcefile))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .on('error', () => this.emit('end'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/server/assets/dist'));
    });
  });
  done();
};
