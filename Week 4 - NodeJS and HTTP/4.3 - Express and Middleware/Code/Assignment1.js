const express = require('express');


const app = express();
let requestCount = 0;

//a global middleware keep count of the number of requests
app.use((req, res, next) => {
    console.log("Got a request..", req.path);
    if( req.path !== '/favicon.ico')
        requestCount = requestCount + 1;
    next();
})



app.get('/users', (req, res) => {
    res.status(200).json({name : "Jane"})
})
app.post('/users', (req, res) => {
    res.status(200).json({msg : "User created successfully"})
})
app.get('/requestcount', (req, res) => {
    res.status(200).json({requestCount});
})

app.listen(3000, () => console.log("Server running..."))