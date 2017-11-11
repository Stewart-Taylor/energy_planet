'use strict';

const Jimp = require('jimp');



Jimp.read('../server/assets/sprites/usa_main.png',  (err, img) => {
    if (err) throw err;
    img.color([
      { apply: 'lighten', params: [ 50 ] }
    ])
    img.fade( 0 )
    .write('../server/assets/sprites/usa.png',);
});

