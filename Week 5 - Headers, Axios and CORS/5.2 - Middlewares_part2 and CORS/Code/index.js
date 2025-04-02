const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
    res.redirect('https://www.google.com/');
})


app.listen(3000, () => console.log("Server running.."));