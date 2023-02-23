import { axiosCache } from "./http-client-proxy.js";

const response1 = await axiosCache.get('https://essential-artisans.azurewebsites.net/api/ServiceCategory/all');
const response2 = await axiosCache.get('https://essential-artisans.azurewebsites.net/api/ServiceCategory/all'); 
console.log(response1.data);
console.log(response2.data);

    /*
    axiosCache.get('https://google.com')
    .then(res => console.log(res.data))
    .catch(e => console.log(e));*/

