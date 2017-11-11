'use strict';

const express = require('express');
const pkg = require('../../../package.json');

const router = new express.Router();

router.get('/', (req, res) => {
  res.render('main', {
    title: 'Energy Planet',
    version: pkg.version
  });
});

module.exports = router;
