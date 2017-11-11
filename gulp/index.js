'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

/**
 * Iterate through the array of tasks we've been given and create the actual
 * Gulp task for it.
 */
module.exports = function SetupGulpTasks() {
  const tasks = fs.readdirSync(path.join(__dirname, './tasks'));

  for (const task of tasks) {
    const name = task.split('.js')[0];
    const taskObj = require(`./tasks/${task}`);

    if (typeof taskObj === 'function') {
      gulp.task(name, taskObj);
    } else {
      gulp.task(name, taskObj.dependencies, taskObj.func);
    }
  }
};
