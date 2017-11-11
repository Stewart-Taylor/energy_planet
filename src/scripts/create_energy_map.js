'use strict';

console.log('starting');

var fs = require('fs');
var parse = require('csv-parse');



function loadData() {
  var csvData=[];
  fs.createReadStream('../../energy_data/energy_data.csv')
      .pipe(parse({delimiter: ','}))
      .on('data', function(csvrow) {
          // console.log(csvrow);
          //do something with csvrow
          csvData.push(csvrow);

        if (csvrow[0] == 'United States') {
          console.log('found it', csvrow.length, 'usage', csvrow[58]);
        }
      })
      .on('end',function() {
        console.log('ayee');
        //do something wiht csvData
        // console.log(csvData);
      });
}





loadData();

