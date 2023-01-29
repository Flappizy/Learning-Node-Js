import axios from 'axios';
import { PassThrough } from 'stream';

export function createUploadStream(fileName) {
    const connector = new PassThrough();
    axios.post('http://localhost:3000', connector, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'X-Filename': fileName
          }
    }).catch((err) => {
        connector.emit(err);
    });

    return connector;
}