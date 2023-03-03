import superagent from 'superagent';
export class CheckUrls {
    constructor(urls) {
        this.urls = urls;
    }

    async * [Symbol.asyncIterator]() {
        for (const url of this.urls) {
            try {
                const urlStatus = await superagent.head(url).redirects(2);
                yield `${url} is up, status: ${urlStatus.status}`
            } catch (error) {
                yield `${url} is down, error: ${error.message}`
            }
        }
    }
}