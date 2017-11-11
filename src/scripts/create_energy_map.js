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

function start() {
  loadData();
}

start();
