import express from 'express'

const app = express();

// only accepts ?a=x&b=x

//middleware to validate query parameters
app.use((req, res, next) => {
    if(Object.keys(req.query).length < 2) return res.status(404).json({err : "query parameter not found.."})
    next();
})

//  /add?a=2&b=10
app.get('/add', (req, res) => {
    console.log(req.headers['name']);
    
    let {a, b} = req.query; 
    let answer = +a + +b;
    res.json({answer})    
})
//  /sub?a=2&b=10
app.get('/sub', (req, res) => {
    let {a, b} = req.query; 
    let answer = +a - +b;
    res.json({answer})    
})
//  /mul?a=2&b=10
app.get('/mul', (req, res) => {
    let {a, b} = req.query; 
    let answer = +a * +b;
    res.json({answer})    
})

app.listen(3000, () => {
    console.log("Sever Runnign..");
})