const express = require('express');
const fs = require('fs');

const app = express();

// route 
app.get('/', (req, res) => {
    res.send("Welcome to server..")   
})

app.get('/about', (req, res) => {
    res.send("Helloo I am Xcin")
})


//listen server 

app.listen(3000, () => console.log("app running on port 3000"));