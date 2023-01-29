const logger = require('./loggerInstance');
logger.log('This is an informational message');
console.log(logger.count);

const customLogger = new logger.constructor('CUSTOM');
customLogger.log('This is an informational message');


console.log(__dirname);
console.log(__filename);
/*
const b = require('./b')
const a = require('./a')
console.log('a ->', JSON.stringify(a, null, 2))
console.log('b ->', JSON.stringify(b, null, 2))*/

/*
const logger = require('./logger')
logger('This is an informational message')
logger.verbose('This is a verbose message')*/

/*
const LoggerClass = require('./loggerClass');
const logger = require('./loggerClass');

const dbLogger = new LoggerClass('DB');
dbLogger.info('This is a database logger');

const accessLogger = new LoggerClass('Access Logger');
accessLogger.verbose('This is an access logger');*/