import { CheckUrls } from "./check-urls.js";

const urls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com'
]);

async function main() {
    for await (const status of urls) {
        console.log(status);
    }
}

await main();