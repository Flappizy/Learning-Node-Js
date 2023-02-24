export function createLazyBuffer(size) {
    let buffer = null;
    return new Proxy({}, {
        get: (obj, prop) => {
            if (prop === "write") {
                return function(data) {
                    if (!buffer) {
                        buffer = Buffer.allocUnsafe(size);
                    }
                    return buffer.write(data);
                }
            }
            if (prop != 'write') {
                if (!buffer) {
                    return function() {
                        console.log('Please use the write method to init the buffer');
                    }
                }
                return buffer[prop].bind(buffer);
            }
        }
    })
}