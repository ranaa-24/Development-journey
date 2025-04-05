require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "onlyher";
let users = [];

const app = express();
app.use(express.json());

// http://localhost:300/    --> frontend 
app.use(express.static('../public'))  

// generating a JWT token whichh wil be assigned to user
const generateToken = (uname) => {
    return jwt.sign({ uname: uname }, SECRET_KEY, { expiresIn: "1d" });
}


// user creates a account 
app.post('/signup', (req, res) => {
    let { uname, password } = req.body;

    let check = users.find((userObj) => userObj.uname == uname)

    console.log(users);

    if (check) return res.status(404).json({ error: "User already exists" })

    users.push({ uname, password });

    res.send("Your account has beed created")
})

// user login
app.post('/signin', (req, res) => {
    let { uname, password } = req.body;
    let user = users.find((uobj) => {
        if (uobj.uname == uname && uobj.password == password) return true;
    });

    if (user) {
        const token = generateToken(user.uname);
        console.log(token);
        res.header("token", token);
        return res.send(`Welcome, ${req.body['uname']}`);
    } else {
        return res.status(503).json({ error: "User not found" })
    }
})


// JWT Verification middleware
const authenticateJWT = (req, res, next) => {
    let token = req.headers.authenticate;
    if (!token) return res.status(403).json({ message: "Access denied" })

    try {
        let decodedData = jwt.verify(token, SECRET_KEY);  // returns {uname : "exuxu"}
        req.uname = decodedData.uname;                      // modify req object,, assining the uname to req
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    next()
}


app.get('/me', authenticateJWT, (req, res) => {
    let user = users.find(user => {
        return user.uname == req.uname;
    })

    if (user) {
        return res.json(user);
    }
    else {
        return res.status(401).json({ Error: "Error findind user data" })
    }

})

app.listen(PORT, () => console.log("Server runnign.."))