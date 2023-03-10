import { promisify } from 'util';
import { deflateRaw, inflateRaw } from 'zlib';

const inflateRawAsync = promisify(inflateRaw);
const deflateRawAsync = promisify(deflateRaw);
export const zlibMiddleware = function () {
    return {
        inbound (message) {
            return inflateRawAsync(Buffer.from(message));
        },
        outbound (message) {
            return deflateRawAsync(message);
        }
    }
}