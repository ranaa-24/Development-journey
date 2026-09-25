const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config();
const app = express();
app.use(express.json());

let users = [];

app.post('/signup', (req, res) => {
    const {username, password} = req.body;  
    if(users.find(user => user.username == username)) return res.status(403).send({msg: "user already exists"});

    users.push({username, password});

    console.log(users);

    return res.send({msg: "success"});
});

app.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(user => user.username ==  username);
    if(!user) return res.status(404).send({msg: "user not found"});

    if(user.password != password) return res.status(403).send({msg: "wrong password"});

    const token = jwt.sign({username}, process.env.JWT_SECRET);

    return res.send({msg: "welcome", token});
});

app.get('/posts', (req, res) => {   
    let [scheme, token] = req.headers['authorization']?.split(" ");
    if(!token || scheme != 'Bearer') return res.status(401).send({msg : "unauthorized"});

    try{
        let playload = jwt.verify(token, process.env.JWT_SECRET);
        let user = users.find(user => user.username == playload.username);

        if(!user) return res.status(401).send({msg: "incorrect token!"});

        return res.sendFile(require('path').join(__dirname, 'img.webp'));
    }catch(err){
        return res.status(403).send({msg: "Unauthorized"});
    }
})



app.listen(3000, () => console.log("running"));