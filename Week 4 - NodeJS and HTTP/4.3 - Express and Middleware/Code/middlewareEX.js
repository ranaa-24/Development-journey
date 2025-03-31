const express = require('express')
const app = express();

//req/res goes through it 
let middlewareFn = (req, res, next) => {
    if (req.query.age > 14) {
        next();     // propagate to other middlewares, app.get() are also considered middleware, they also has next()
    }
    else {           // put it inside else so that the req wont reach here..
        return res.status(404).json({ error: "Not eligible" })
    }
}


app.use(middlewareFn)

// after next() is called the request propagates to bellow

app.get('/ride1', (req, res) => {
    return res.send("Welcome to ride1");
});


// we can also add middlewares individually
// app.get('/ride1', middlewareFn, (req, res) => {
//     return res.send("Welcome to ride1");
// });

app.get('/ride2', (req, res) => {
    return res.send("Wellcome to ride2")
})


app.listen(3000, () => console.log("Server runnign.."));