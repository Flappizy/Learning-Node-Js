import { load } from 'cheerio';
import path from 'path';
import slug from 'slug';
import { URL } from 'url';

export function urlToFilename (url) {
    const parsedUrl = new URL(url) //Declare a URL class that takes the url argument
    const urlPath = parsedUrl.pathname.split('/') //Splits the url string by '/' into an array
      .filter(function (component) { //filters the string based on that function filter
        return component !== '' //If string is not equal to '' then it should be added 
                                //to the new array otherwise it should be skipped 
      })
      .map(function (component) { // for each string that passed the filter condition above 
        return slug(component, { remove: null }) //
      })
      .join('/');//This returns a string by adding all the string in the array sperated by /
    let filename = path.join(parsedUrl.hostname, urlPath)// Joins both argument together
    if (!path.extname(filename).match(/htm/)) {
      filename += '.html'
    }
  
    return filename
  }

  function getLinkUrl (currentUrl, element) {
    const parsedLink = new URL(element.attribs.href || '', currentUrl) //Why this
    console.log(parsedLink, parsedLink.pathname);
    const currentParsedUrl = new URL(currentUrl)
    if (parsedLink.hostname !== currentParsedUrl.hostname ||
      !parsedLink.pathname) {
      return null
    }
    return parsedLink.toString()
  };

  export function getPageLinks (currentUrl, body) {
    return Array.from(load(body)('a'))
      .map(function (element, index) {        
        return getLinkUrl(currentUrl, element)
      })
      .filter(Boolean)
  };