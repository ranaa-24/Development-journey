const http = require('http');

let server = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            res.end("<h1> Hii! Wellcome to portfolio");
            break;
        case '/about':
            res.end("<h1> Hii! im Rana");
            break;
        case '/skills':
            res.end("<h1> Creation, Imagination");
            break;
        default:
            res.end("<h1> 404 Error");
    }

})

server.listen(3000, () => console.log("Server running on port 3000"));