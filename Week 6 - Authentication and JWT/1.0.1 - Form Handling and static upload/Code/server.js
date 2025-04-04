const express = require('express')

const app = express()

app.use(express.urlencoded({extended : true}))
//on same port
app.use(express.static("public"))

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send("OK")
})

app.listen(3001, () => console.log('Server running..'));


