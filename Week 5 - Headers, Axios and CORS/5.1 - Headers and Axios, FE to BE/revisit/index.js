const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    console.log(req.headers['user-agent']);
    res.setHeader("connection", "close")
    return res.send("<h1>Hello<h2"); 
})


app.listen(3000, () => console.log("Started.."));
