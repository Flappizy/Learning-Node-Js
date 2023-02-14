import { dirname, join } from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const db = new sqlite3.Database(join(__dirname, 'data.sqlite'));