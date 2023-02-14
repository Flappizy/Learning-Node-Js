import http from 'http';

export class RequestBuilder {
    setHttpMethod(method) {
        this.method = method;
        return this;
    }

    setHostName(hostName) {
        this.hostName = hostName;
        return this;
    }

    setPath(path) {
        this.path = path;
        return this;
    }

    setPort(port) {
        this.port = port;
        return this;
    }

    setHeaders(type, length) {
        this.type = type;
        this.length = length;
        return this;
    }

    setRequestBody(body) {
        if (body)
            this.body = JSON.stringify(body); 
        return this;
    }

    build() {
        this.options = {
            hostname: this.hostName,
            port: this.port,
            path: this.path,
            method: this.method,
            headers: {
                'Content-Type': this.type ? this.type : 'application/text',
                'Content-Length': this.length ? this.length : 0
            },
        };
    }

    invoke() {
        return new Promise((resolve, reject) => {
            let data;
            const req = http.request(this.options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                //res.setEncoding('utf8');
                res.on('data', (chunk) => {
                  data += chunk;
                });

                res.on('end', () => {
                  console.log('No more data in response.');
                  resolve(data);
                });
            });

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });

            if (this.method.toUpperCase() === 'POST') {
                req.write(this.body);
            }

            //With http.request() one must always call req.end() 
            //to signify the end of the request - even if there is no data being written to the request body.
            req.end();
        });
    }
}