require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "onlyher";
let users = [];

const app = express();
app.use(express.json());

// generating a JWT token whichh wil be assigned to user
const generateToken = (uname) => {
    return jwt.sign({ uname: uname }, SECRET_KEY, { expiresIn: "1d" });
}



// user creates a account 
app.post('/signup', (req, res) => {
    let { uname, password } = req.body;

    let check = users.find((userObj) => userObj.uname == uname)

    console.log(users);

    if (check) return res.json({ error: "User already exists" })

    users.push({ uname, password });

    res.send("Welcome")
})

app.post('/signin', (req, res) => {
    let { uname, password } = req.body;
    let user = users.find((uobj) => {
        if (uobj.uname == uname && uobj.password == password) return true;
    });


    const token = generateToken(user.uname);
    console.log(token);

    if (user) {
        // user.token = token; // no need to assign, user will send there JWT as header, and jwt.verify() will varify it    

        return res.json({
            jsonToken: token,
            description: "while requesting for /me, make sure to send the tha token as authenticate header"
        })
    } else {
        return res.json({ error: "User not found" })
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


// a end point that rerturns the users information if they send theri authentication token 
app.get('/me', authenticateJWT, (req, res) => {
    // we have authorized the user w/o hitting the db (in our case its users array), 
    //in order to retieve some info about ueser we have to hit db 
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