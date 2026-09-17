import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    exposedHeaders: ['X-Name']
}));

app.get('/', (req, res) => {
    console.log(req.query.id);
    return res.send({msg: "welcome from api-v1"});
})

app.get('user/:id', (req, res) => {
    res.set('X-Name', 'Rana');      
    console.log(req.params);
    return res.send({ msg: "done", id: req.params.id });
});

app.get('/add', (req, res) => {
    let a = parseInt(req.query.a);
    let b = parseInt(req.query.b);

    if(!a || !b) return res.status(400).send({message: "no query passed!!"});

    return res.send({res: a+b});
})

app.post('/data', (req, res) => {
    const body = req.body ?? {};
    console.log(req.headers);
    return res.status(200).send({ msg: "done", info: JSON.stringify(body) });
});
 
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});