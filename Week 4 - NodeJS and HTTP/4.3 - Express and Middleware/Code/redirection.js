const express = require('express');

let app = express();

app.get("/", (req, res, next) => {
    res.redirect('/red')
    console.log(`Req on ${req.url}`);
    
})
app.get("/red", (req, res, next) => {
    console.log(`Req on ${req.url}`);
    res.send("You have been redirected!!")
})


app.listen(3000, () => console.log("Server running"))