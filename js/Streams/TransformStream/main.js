import { ReplaceStream } from './replaceStream.js';

process.stdin
    .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
    .pipe(process.stdout);




/*
const csvParser = parse({ columns: true });
createReadStream('file.csv.gv')
    //.pipe(createGunzip())
    .pipe(csvParser)
    .pipe(new FilterByCountry('Italy'))
    .pipe(new SumProfit())
    .pipe(process.stdout);

const replaceStream = new ReplaceStream('World', 'Node.js');
replaceStream.on('data', chunk => console.log(chunk.toString()));
replaceStream.write('Hello W');
replaceStream.write('orld!');
replaceStream.end();*/