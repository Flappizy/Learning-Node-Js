import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { PassThrough, pipeline } from 'stream';
import { CommonCrimesAggregator } from './commonCrimes.js';
import { PercentageOfCrimeThroughTheYears } from './crimeRate.js';
import { MostDangerousAreasInLondon } from './dangerousAreas.js';

const csvParser = parse({ columns: true });

const crimesDataFile = createReadStream('london_crime_by_lsoa.csv');
const aggregatorTypes = {
    commonCrimes: new CommonCrimesAggregator(),
    dangerousAreas: new MostDangerousAreasInLondon(),
    crimeRate: new PercentageOfCrimeThroughTheYears() 
}

const createDataAggregatormonitor = aggregatorType => {
    const monitor = new PassThrough({ objectMode: true });
    monitor.on('data', chunk => {
        aggregatorTypes[aggregatorType].processData(chunk);
    });
    
    return monitor; 
}

pipeline(
    crimesDataFile,
    csvParser,
    createDataAggregatormonitor('commonCrimes'),
    createDataAggregatormonitor('dangerousAreas'),
    createDataAggregatormonitor('crimeRate'),
    (err) => {
        if (err) {
            console.error('pipeline failed: ', err);
            process.exit(1);
          }
          const { commonCrimes, dangerousAreas, crimeRate } = aggregatorTypes;
          console.log('most common and least common crimes:', commonCrimes.answerQuestion());
          console.log('crimes over the years: ', crimeRate.answerQuestion());
          console.log('most dangerous areas of London: ', dangerousAreas.answerQuestion());
    }
)