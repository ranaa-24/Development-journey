const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())


app.get('/user/:userName', (req, res) => {
    let userName = req.params.userName;
    let imgPath = path.join(__dirname, "images", userName+".jpg");
    console.log(userName);
    return res.sendFile(imgPath);
})

app.listen(3000)