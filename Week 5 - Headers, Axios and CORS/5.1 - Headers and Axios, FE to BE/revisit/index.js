import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.post('/data', (req, res) => {
    const body = req.body ?? {};
    console.log(body);
    return res.status(200).send({ msg: "done" });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});``