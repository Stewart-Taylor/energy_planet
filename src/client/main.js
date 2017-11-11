'use strict';

const VisualManager = require('./visual-manager');

$(document).ready(() => {
  const visualManager = new VisualManager();
  visualManager.initialize();
});
