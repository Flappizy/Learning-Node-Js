import ini from 'ini';
import { ConfigTemplate } from './config-template.js';

export class IniConfig extends ConfigTemplate {
    _serialize(data) {
        return ini.stringify(data);
    }

    _deserialize(data) {
        return ini.parse(data);
    }
}