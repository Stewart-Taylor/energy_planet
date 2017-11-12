'use strict';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.render('sources', {
    title: 'Energy Planet sources'
  });
});

module.exports = router;
