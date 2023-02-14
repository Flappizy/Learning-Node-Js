import { RequestBuilder } from "./request.js";

const requestBuilder = new RequestBuilder();
requestBuilder
    .setHttpMethod('GET')
    .setHostName('www.google.com')
    .setPath('/')
    .setPort(80)
    .setRequestBody(null)
    .setHeaders(null, 0)
    .build();

requestBuilder
    .invoke()
    .then(res => console.log(`Response from successful request: ${res}`))
    .catch(e => console.log(e));    