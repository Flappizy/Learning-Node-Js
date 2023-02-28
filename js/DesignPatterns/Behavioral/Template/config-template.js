import { promises as fsPromises } from 'fs';
import objectPath from 'object-path';

export class ConfigTemplate {
    //Deserialize data in filePath into this.data
    async load(filePath) {
        console.log(`Deserializing from ${filePath}`);
        this.data = this._deserialize(await fsPromises.readFile(filePath, 'utf-8'));
    }

    async save(filePath) {
        console.log(`Serializing to ${filePath}`);
        await fsPromises.writeFile(path, this._serialize(this.data));
    }

    get(prop) {
        return objectPath.get(this.data, prop);
    }

    set(prop, value) {
        return objectPath.set(this.data, prop, value);
    }

    _deserialize() {
        throw new Error('_deserialize() must be implemented');
    }

    _serialize() {
        throw new Error('_serialize() must be implemented');
    }
}