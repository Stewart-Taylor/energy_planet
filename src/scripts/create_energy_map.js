'use strict';

console.log('starting');

var fs = require('fs');
var parse = require('csv-parse');
const Jimp = require('jimp');

const DATA_PATH = '../../energy_data/energy_data.csv';
const YEAR_ROW = 58; // 58 = 2014


function createEnergyImage(country, amount) {
  return new Promise((resolve) => {
    let fadeAmount = amount / 100;
    Jimp.read(`../../countries/${country}.png`,  (err, img) => {
        if (err) throw err;
        img.color([ { apply: 'lighten', params: [ 50 ] } ])
        img.fade(fadeAmount)
        .write(`../../temp/${country}.png`, () => {
          resolve();
        });
    });
  });
}

function processRow(country, amount) {
  return new Promise((resolve) => {
    let cleanedName = country.replace(' ', '_');
    // TODO: remove these chars too [. ,]

    fs.stat(`../../countries/${cleanedName}.png`, (err, stat) => {
     if(err === null) {
          // console.log('File exists');
          console.log('Processing country', cleanedName, 'renewable energy usage', amount);
          return createEnergyImage(cleanedName, amount);
      } else if(err.code == 'ENOENT') {
        resolve();
          // file does not exist
          // fs.writeFile('log.txt', 'Some log\n');
      } else {
        console.log('Some other error: ', err.code);
        resolve();
      }
    });
  });
}

function loadData() {
  return new Promise((resolve) => {
    let csvData = [];
    let promises = [];
    fs.createReadStream(DATA_PATH)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
          csvData.push(csvrow);
          promises.push(processRow(csvrow[0], csvrow[YEAR_ROW]));
        })
        .on('end',function() {
          console.log('ayee');


          Promise.all(promises).then(() => {
            console.log('All complete');
          });
        });
  });
}







function combineMaps(){
  var blend = require('blend');

  let imageBuffers = [];


  let files = fs.readdirSync('../../temp/');

  files = files.filter((file) => {
    if (file.includes('.png')) {
      return file;
    }
  return false;
});

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    imageBuffers[i] = fs.readFileSync(`../../temp/${files[i]}`);
  }

  blend(imageBuffers, (err, result) => {
    console.log(err);
    Jimp.read(result,  (err, img) => {
      if (err) throw err;
      img.write(`../../temp2/complete.png`, () => {
        console.log('ya done now');
      });

      img.write(`../../src/server/assets/sprites/complete.png`, () => {
        console.log('ya done now 2');
      });

    });
      // result contains the blended result image compressed as PNG.
  });



  // mergeImages([
  //   '../../countries/Mexico.png',
  //   '../../countries/United_States.png',
  //   '../../countries/Canada.png'
  // ]).then((b64) => {
  //   Jimp.read(b64,  (err, img) => {
  //     if (err) throw err;
  //     img
  //     .write(`../../temp/complete.png`, () => {
  //       resolve();
  //     });
  //   });
  // })
}

function start() {
  // loadData();
  combineMaps();
}

start();
