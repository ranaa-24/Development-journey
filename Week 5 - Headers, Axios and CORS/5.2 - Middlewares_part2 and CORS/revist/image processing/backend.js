const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(req.method + req.url);
    next();
})



// app.use('/images', express.static(path.join(__dirname, 'public')))

app.get('/api/readme', (req, res) => {
    return res.send({
        message: "Hello welcome to the xcin api-v1"
    })
})

app.get('/api/image', (req, res) => {
    const imagePath = path.join(__dirname, 'public/img1.jpg');

    return res.sendFile(imagePath)
})


// ***
app.get('/private/image', (req, res) => {
    const token = req.headers['authorization']?.split(" ")[1];

    if (token !== 'iloveisha') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing token'
        });
    }

    return res.sendFile(path.resolve(__dirname, 'image.jpg'));
})



app.listen(3000, () => {
    console.log("on http://127.0.0.1:3000")
})