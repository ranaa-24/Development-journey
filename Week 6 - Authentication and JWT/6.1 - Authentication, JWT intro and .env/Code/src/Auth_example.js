const express = require('express')
const { generateToken } = require('./tokenGenerator');
const app = express();

app.use(express.json());

let users = [];



// user creats a account 
app.post('/signup', (req, res) => {
    let { uname, password } = req.body;

    let check = users.find((userObj) => userObj.uname == uname)

    console.log(users);

    if (check) return res.json({ error: "User already exists" })

    users.push({ uname, password });

    res.send("Welcome")


})

// user sign in to their account, if authenticate, will send a token to then..
// after they got the token. in Subsequent request they need to send Authentication header, so that we can authenticate w/o re login (other route ka kaam hai ye, lets implement the initial token generation only)
app.post('/signin', (req, res) => {
    let { uname, password } = req.body;
    let user = users.find((uobj) => {
        if (uobj.uname == uname && uobj.password == password) return true;
    });


    const token = generateToken();
    if (user) {
        user.token = token;     // add token to the user reference
        return res.json({
            token: token
        })
    } else {
        return res.json({ error: "User not found" })
    }
})


// a end point that rerturns the users information if they send theri authentication token 
app.get('/me', (req, res) => {
    let token = req.headers.authenticate;
    console.log(token);

    let user = users.find(user => {
        return user.token == token
    })

    if (user) {
        return res.json(user);
    }
    else {
        return res.status(401).json({ Error: "Unauthorized" })
    }

})

app.listen(3000, () => console.log("Server runnign.."))