import { URLBuilder } from "./urlBuilder.js";

const url = new URLBuilder()
    .setProtocol('https')
    .setAuthentication('user', 'pass')
    .setHostname('example.com')
    .setPort(7306)
    .build();
    
console.log(url.toString());