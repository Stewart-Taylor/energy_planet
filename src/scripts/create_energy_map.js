'use strict';

const fs = require('fs');
const parse = require('csv-parse');
const Jimp = require('jimp');
const blend = require('blend');

const DATA_PATH = '../../energy_data/energy_data.csv';
const YEAR_ROW = 58; // 2014
// const YEAR_ROW = 34; // 1990

const BLUR_SIZE = 5;
const DEBUG_MODE = false;

/*
 * Creates a map image of the country based on renewable energy usage
 * The base map piece is loaded in and faded based on the input value
 */
function createEnergyImage(country, amount) {
  return new Promise((resolve) => {
    const fadeAmount = amount / 100;
    Jimp.read(`../../countries/${country}.png`, (err, img) => {
      if (err) throw err;
      img.fade(fadeAmount)
      .write(`../../temp/${country}.png`, () => { resolve(); });
    });
  });
}

/*
 * Takes the entry from the energy data CSV and determines if their is a
 * if their is an associated map image for it.
 */
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

    fs.stat(`../../countries/${cleanedName}.png`, (err) => {
      if (err === null) {
        // console.log('File exists');
        console.log('Processing country', cleanedName, 'renewable energy usage', amount);
        createEnergyImage(cleanedName, amount).then(() => { resolve(); });
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
function loadData() {
  return new Promise((resolve) => {
    const csvData = [];
    const promises = [];
    fs.createReadStream(DATA_PATH)
      .pipe(parse({ delimiter: ',' }))
      .on('data', (csvrow) => {
        csvData.push(csvrow);
        if (DEBUG_MODE) {
          if (csvrow[0] === 'United States') {
            promises.push(processRow(csvrow[0], csvrow[YEAR_ROW]));
          }
        } else {
          promises.push(processRow(csvrow[0], csvrow[YEAR_ROW]));
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
function combineMaps() {
  const imageBuffers = [];
  let files = fs.readdirSync('../../temp/');
  files = files.filter((file) => {
    if (file.includes('.png')) {
      return file;
    }
    return false;
  });

  console.log(files.length, 'to be combined');

  for (let i = 0; i < files.length; i += 1) {
    imageBuffers[i] = fs.readFileSync(`../../temp/${files[i]}`);
  }

  blend(imageBuffers, (blendErr, result) => {
    if (blendErr) throw blendErr;
    Jimp.read(result, (jimpErr, img) => {
      if (jimpErr) throw jimpErr;
      img
      .gaussian(BLUR_SIZE)
      .write('../../src/server/assets/sprites/complete.png', () => {
        console.log('complete');
      });
    });
  });
}

/*
 * Starts the process for creating the renewable energy maps for
 * the input year.
 */
function processYear(year) {
  console.log(`Processing started for year ${year}`);
  loadData()
  .then(() => {
    console.log(`All country maps created for ${year}`);
    combineMaps();
  });
}

/*
 * Starts the procedure to create the maps for the various years
 * Currently only 2014 supported
 */
function start() {
  processYear(2014);
}

start();
