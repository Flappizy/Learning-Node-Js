import axios from "axios";

const cache = {};
const handler = {
    get: (target, prop) => {
        if (prop === 'get') {
            return async function(...args) {
                const [url] = args;
                const response = cache[url.toLowerCase()];
                if (response) {
                    console.log(`Get request ${url} is found in cache`);
                    //Because we are getting a response from the cache we need to return a promise with the value of the
                    //request which is defaultly returned by axios
                    return Promise.resolve(response);
                }

                try {
                    const data = await target.get(url);
                    cache[url.toLowerCase()] = data;
                } catch (error) {
                    throw new Error(error);
                }
                //
                return cache[url.toLowerCase()];
            }
        }
        return target[prop];
    }
}

export const axiosCache = new Proxy(axios, handler);