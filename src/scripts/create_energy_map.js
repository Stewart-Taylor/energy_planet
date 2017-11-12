'use strict';

const fs = require('fs');
const parse = require('csv-parse');
const Jimp = require('jimp');

const DATA_PATH = '../../energy_data/energy_data.csv';
const YEAR_ROW = 58; // 2014
// const YEAR_ROW = 34; // 1990


function createEnergyImage(country, amount) {
  return new Promise((resolve) => {
    let fadeAmount = amount / 100;
    Jimp.read(`../../countries/${country}.png`,  (err, img) => {
        if (err) throw err;
        // img.brightness(fadeAmount)
        // .gaussian(30)
        // img.color([ { apply: 'lighten', params: [ 50 ] } ])
        img.fade(fadeAmount)
        .write(`../../temp/${country}.png`, () => {
          resolve();
        });
    });
  });
}

function processRow(country, amount) {
  return new Promise((resolve) => {
    let cleanedName = country;
    // TODO clean this up
    cleanedName = cleanedName.replace(' ', '_');
    cleanedName = cleanedName.replace(' ', '_');
    cleanedName = cleanedName.replace(' ', '_');
    cleanedName = cleanedName.replace(' ', '_');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace('.', '');
    cleanedName = cleanedName.replace(',', '');
    cleanedName = cleanedName.replace(',', '');
    cleanedName = cleanedName.replace(',', '');
    cleanedName = cleanedName.replace(',', '');

    fs.stat(`../../countries/${cleanedName}.png`, (err, stat) => {
     if(err === null) {
        // console.log('File exists');
        console.log('Processing country', cleanedName, 'renewable energy usage', amount);
        return createEnergyImage(cleanedName, amount);
      } else if(err.code == 'ENOENT') {
        // console.log('country does not exist', cleanedName);
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

let debug = false;
let firstProcessed = false;

function loadData() {
  return new Promise((resolve) => {
    let csvData = [];
    let promises = [];
    fs.createReadStream(DATA_PATH)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
          csvData.push(csvrow);
          if (debug) {
            if (csvrow[0] === 'United States'){
              promises.push(processRow(csvrow[0], csvrow[YEAR_ROW]));
              //   console.log('done');
              // });
            }
          } else {
            promises.push(processRow(csvrow[0], csvrow[YEAR_ROW]));
          }
        })
        .on('end',function() {
          // console.log('ayee', promises);


          Promise.all(promises).then(() => {
            console.log('All complete');
            resolve();
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
      img
      .gaussian(5)
      .write(`../../src/server/assets/sprites/complete.png`, () => {
        console.log('complete');
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
  // loadData().then(() => {
  //   combineMaps();
  // })
  combineMaps();
}

start();
