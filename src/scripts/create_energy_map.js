'use strict';

const fs = require('fs');
const parse = require('csv-parse');
const Jimp = require('jimp');
const blend = require('blend');

const DATA_PATH = '../../energy_data/energy_data.csv';
const YEAR_BASE_COLUMN = 58; // 2014
const YEAR_BASE = 2014; // 2014

const BLUR_SIZE = 5;
const DEBUG_MODE = false;
const SINGLE_YEAR = false;

/*
 * Creates a map image of the country based on renewable energy usage
 * The base map piece is loaded in and faded based on the input value
 */
function createEnergyImage(country, amount, year) {
  return new Promise((resolve) => {
    const fadeAmount = amount / 100;
    Jimp.read(`../../countries/${country}.png`, (err, img) => {
      if (err) throw err;
      img.fade(fadeAmount)
      .write(`../../temp/year_${year}/${country}.png`, () => { resolve(); });
    });
  });
}

/*
 * Takes the entry from the energy data CSV and determines if their is a
 * if their is an associated map image for it.
 */
function processRow(country, amount, year) {
  return new Promise((resolve) => {
    let cleanedName = country;
    cleanedName = cleanedName.split(' ').join('_');
    cleanedName = cleanedName.split('.').join('');
    cleanedName = cleanedName.split(',').join('');

    fs.stat(`../../countries/${cleanedName}.png`, (err) => {
      if (err === null) {
        // console.log('File exists');
        console.log('Processing country', cleanedName, 'renewable energy usage', amount);
        createEnergyImage(cleanedName, amount, year).then(() => { resolve(); });
      } else if (err.code === 'ENOENT') {
        // console.trace('Map file does not exist for country.', cleanedName);
        resolve();
      } else {
        console.error('Error: ', err);
        resolve();
      }
    });
  });
}

/*
 * Loads in the data from the renewable energy data CSV
 * Each valid entry is passed through to the row processor.
 */
function loadData(year) {
  return new Promise((resolve) => {
    const csvData = [];
    const promises = [];
    const yearColumn = YEAR_BASE_COLUMN - (YEAR_BASE - year);
    console.log('yearColumn', yearColumn);


    fs.createReadStream(DATA_PATH)
      .pipe(parse({ delimiter: ',' }))
      .on('data', (csvrow) => {
        csvData.push(csvrow);
        if (DEBUG_MODE) {
          if (csvrow[0] === 'United States') {
            promises.push(processRow(csvrow[0], csvrow[yearColumn], year));
          }
        } else {
          promises.push(processRow(csvrow[0], csvrow[yearColumn], year));
        }
      }).on('end', () => {
        Promise.all(promises).then(() => {
          console.log('All country maps processed');
          resolve();
        });
      });
  });
}


/*
 * Loads in the data from the renewable energy data CSV
 * Each valid entry is passed through to the row processor.
 * All maps are combined into one image to make it easier for the shader to display
 */
function combineMaps(year) {
  return new Promise((resolve) => {
    const imageBuffers = [];
    let files = fs.readdirSync(`../../temp/year_${year}`);
    files = files.filter((file) => {
      if (file.includes('.png')) {
        return file;
      }
      return false;
    });

    console.log(files.length, 'to be combined');

    for (let i = 0; i < files.length; i += 1) {
      imageBuffers[i] = fs.readFileSync(`../../temp/year_${year}/${files[i]}`);
    }

    blend(imageBuffers, (blendErr, result) => {
      if (blendErr) throw blendErr;
      Jimp.read(result, (jimpErr, img) => {
        if (jimpErr) throw jimpErr;
        img
        .gaussian(BLUR_SIZE)
        .write(`../../src/server/assets/sprites/years/year_${year}.png`, () => {
          resolve();
        });
      });
    });
  });
}

/*
 * Starts the process for creating the renewable energy maps for
 * the input year.
 */
function processYear(year) {
  return new Promise((resolve) => {
    console.log(`Processing started for year ${year}`);
    loadData(year)
    .then(() => {
      console.log(`All country maps created for ${year}`);
      combineMaps(year).then(() => {
        console.log(`Year ${year} complete`);
        resolve();
      });
    });
  });
}

/*
 * Starts the procedure to create the maps for the various years
 * Currently only 2014 supported
 */
function start() {
  processYear(2014);
  if (DEBUG_MODE || SINGLE_YEAR) {
    processYear(2014);
  } else {
    for (let i = 1990; i < 2015; i += 1) {
      processYear(i);
    }
  }
}

start();
