const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(cors());


app.use("/FE", express.static(path.join(__dirname, 'public')));

app.post('/sum', (req, res) => {
    const { a, b } = req.body;
    const total = Number(a) + Number(b);
    console.log(req.body);

    return res.send({ message: `sum is ${total}` });
});

app.listen(3000, () => console.log('http://127.0.0.1:3000/'));