import { createReadStream } from 'fs';
import lazystream from 'lazystream';

//In the following example, lazystream allows us to create a lazy Readable stream for
//the special Unix file /dev/urandom
const lazyURandom = new lazystream.Readable(function (options) {
    return createReadStream('/dev/urandom');
});