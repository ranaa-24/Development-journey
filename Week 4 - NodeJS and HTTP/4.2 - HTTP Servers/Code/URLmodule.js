const { log } = require('console');
const { URL } = require('url');

const myUrl = new URL("https://example.com:8080/path?name=John&age=25")

console.log(myUrl.href);
console.log(myUrl.protocol);
console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.port);
console.log(myUrl.pathname);
console.log(myUrl.searchParams.get('name'));
