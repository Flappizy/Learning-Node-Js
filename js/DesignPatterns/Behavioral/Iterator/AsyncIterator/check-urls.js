import superagent from "superagent";

export class CheckUrls {
    constructor(urls) {
        this.urls = urls;
    }

    [Symbol.asyncIterator]() {
        const iterator = this.urls[Symbol.iterator]();//Gets the iterator method from the data structure e.g. an Array 
        return {
            async next() {
                const iteratorResult = iterator.next();//Gets the first value/element in the data structure 
                //If there are no element left or the data structure/container is empty then the iteration ends
                if (iteratorResult.done) {
                    return { done: true };
                }
                
                const url = iteratorResult.value;//Gets the element in the container, in this case is the URL
                try {
                    const urlStatus = await superagent.head(url)
                        .redirects(2);
                    return {
                        done: false,
                        value: `${url} is up, status: ${urlStatus.status}`
                    }
                } catch (error) {
                    return {
                        value: `${url} is down, error: ${error.message}`,
                        done: false
                    }
                }
            }
        }
    }
}