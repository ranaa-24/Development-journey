const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "http://localhost",
    methods: ["GET", "POST"],      // other methods wont allowed  
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,         // allow cookies
}));

app.use(cors());        //  // allows all origin

app.get('/user', (req, res) => {
    res.send('Hello From server')
})

app.listen(3000, () => console.log("Server Runnig.."));

