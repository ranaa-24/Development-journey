const express = require('express');
const jwt = require('jsonwebtoken');
JWT_SECRET = 'mybbgissleeping'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

// function generateToken() {
//     const options = ['A', 'c', 'I', 's', 'H', '1', '2', '$', '@']
//     let token = "";
//     for (let i = 0; i < 10; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }

//     return token;
// }

app.get('/', (req, res) => {
    res.send({ msg: "Welcome to API-V1" });
})


app.post('/signin', (req, res) => {
    // log in 
    const { username, password } = req.body;

    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) return res.status(404).send({ msg: "User not found" });

    const user = users[userIndex];

    if (user.password !== password) {
        return res.status(404).send({ msg: "Incorrect password" });
    }

    // Generate and store the token on the logged-in user.
    // const token = generateToken();
    const token = jwt.sign({ username }, JWT_SECRET);

    return res.send({ msg: "Login successful", token });
})

app.post('/signup', (req, res) => {
    let { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(401).send({ msg: "user already exists" })
    }

    users.push({ username, password });
    console.log(users);
    return res.send({ msg: "Success", credentials: users.at(-1) })
})

let verifyToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const [scheme, token] = auth ? auth.split(" ") : [];

    if (!token || scheme !== 'Bearer') {
        return res.status(401).json({ msg: "Access Denied! No token provided" });
    }

    // jwt.verify(token, JWT_SECRET, (err, data) => {
    //     if (err) return res.status(403).json({ msg: "Invalid token" });
    //     req.user = data;
    //     next();
    // });

    try{
        let playload = jwt.verify(token, JWT_SECRET)
        req.user = playload;
        next();
    }catch{
        return res.status(403).json({ msg: "Invalid token" });
    }
};

// use the token
app.get('/me', verifyToken, (req, res) => {
    res.send({ username: req.user.username });
});


app.listen(3000, () => console.log('http://127.1.1.0:3000/'));