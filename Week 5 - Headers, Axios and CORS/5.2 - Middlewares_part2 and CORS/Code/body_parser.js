const express = require('express');
const bp = require('body-parser');

const app = express();
app.use(bp.json());

app.post('/sum', (req, res) => {
    console.log(req.body);

    if(req.body){
        let {a, b} = req.body;
        return res.json({answer : a+b});
    }
    else 
        return res.end({error : "Provide a json body.."})
})


app.listen(3000, () => console.log("Server running.."));