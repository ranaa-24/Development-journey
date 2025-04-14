const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Users, Todos } = require("./db.js");
const { z } = require("zod");
require('dotenv').config();

// connection to the db, its also async 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected!!"))
    .catch((err) => console.log(err));



const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "whyNotOther";
const app = express();

app.use(express.json());

// db models 

function generateToken(userId) {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '2h' });
}

app.post('/signup', async (req, res) => {

    //zod validation
    const requiredUser = z.object({
        email : z.string().email().refine((val) => val.endsWith("@gmail.com"), {message : "Please provide a valid gmail"}), 
        password : z.string().min(8, "Password must be atleast 8 charaters"), 
        username : z.string().max(20, "username should be atmax 10 characters")
    })

    let isValidInputs = requiredUser.safeParse(req.body);

    if(!isValidInputs.success){
        return res.json({message : isValidInputs.error.errors[0].message});
    }


    const { email, username, password } = req.body;
    // or we could simplly create :   Users.create(req.body); as req.body - {email:xs1@gmail.com, username:1e2e, password: 232n}4
    console.log(email, username, password);

    const hasedPass = await bcrypt.hash(password, 10);

    // .create user returns a promise and when resolved it returns the created field
    try {
        let createdUser = await Users.create({  // may throw error like, duplicate key or somthing
            email: email,
            username: username,
            password: hasedPass
        });

        return res.status(200).json({ message: "Account Crated successfully" });
    } catch (err) {
        return res.status(503).json({ message: err.message });
    }
})

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    let user = await Users.findOne({
        username : username
    })

    if(!user) return res.status.json({message : "user doesnt exists!"})

    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
        const token = generateToken(user._id);
        res.header('token', token);
        return res.send('<h1> Welcome </h1>');
    }
    else {
        res.status(403).json({ message: "Incorrect Credentials" })
    }
})

//only authenticated user can access
const authenticateJWT = (req, res, next) => {
    const token = req.headers['auth'];
    if (!token) {
        return res.status(403).json({ message: "Access Denied!!" })
    }

    try {
        let decodedObject = jwt.verify(token, SECRET_KEY);
        req.userId = decodedObject.userId;
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    next();
}

app.post('/todo', authenticateJWT, async (req, res) => {
    // req.userId ==> a specific user's doc id 
    const { title } = req.body;
    let userId = req.userId;
    let todo = await Todos.create({
        userId: userId,
        title: title
    })
    return res.send(`"${title}" - has been added!`);
})

app.get('/todo', authenticateJWT, async (req, res) => {
    let currentUserId = req.userId;
    let todos = await Todos.find({ userId: currentUserId })
    return res.send(JSON.stringify(todos, null, 2))
})

app.listen(PORT, () => console.log("Server is Runnig.."))


