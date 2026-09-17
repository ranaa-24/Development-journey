const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

function generateToken() {
    const options = ['A', 'c', 'I', 's', 'H', '1', '2', '$', '@']
    let token = "";
    for (let i = 0; i < 10; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }

    return token;
}

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
    const token = generateToken();
    users[userIndex] = { ...user, token };
    console.log(users);
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

// use the token
app.get('/me', (req, res) => {
    const [scheme, token] = (req.header('authorization') || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    const user = users.find(u => u.token === token);
    if (!user) return res.status(401).send({ msg: "Unauthorized" });

    const { password, token: _, ...safeUser } = user;
    return res.send(safeUser);
})


app.listen(3000, () => console.log('http://127.1.1.0:3000/'));