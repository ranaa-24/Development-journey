const http = require('http');
const { URL } = require('url');

let server = http.createServer((req, res) => {
    console.log(`Request from - ${req.socket.remoteAddress}`);
    let reqUrl = new URL(req.url, `http://${req.headers.host}`);
    switch (reqUrl.pathname) {
        case '/':
            let name = reqUrl.searchParams.get('name') || 'Buddy'
            res.end(`<h1> Hello! ${name}`);
            break;
        case '/about':
            res.end(`<h1> Im Xcin!`);
            break;
        default:
            res.end('404 - Not found');
    }

})

let PORT = 3000;

server.listen(PORT, () => console.log("Server running on port 3000"));

