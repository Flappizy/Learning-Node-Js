import { ConfigTemplate } from "./config-template.js";

export class JsonConfig extends ConfigTemplate {
    _serialize(data) {
        return JSON.stringify(data);
    }

    _deserialize(data) {
        return JSON.parse(data);
    }
}