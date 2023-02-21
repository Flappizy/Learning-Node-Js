import { Level } from 'level';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { levelSubscribe } from './level-subscribe.js';

const _dirName = dirname(fileURLToPath(import.meta.url));
const dbPath = join(_dirName, 'db');

const db = new Level(dbPath, { valueEncoding: 'json' });
levelSubscribe(db);

db.subscribe({ doctype: 'tweet', language: 'en' }, (k, v) => console.log(`${k} ${JSON.stringify(v)}`));
db.put('1', { 
    doctype: 'tweet',
    text: 'Hi',
    language: 'en'
});
db.put('2', {
    doctype: 'company',
    name: 'ACME Co.'
});