const express = require('express');
const { conn, Todo, User } = require('./db');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const {z, string} = require('zod');

const app = express();
app.use(express.json());
env.config();


conn().then(() => console.log("Db Connected"))

app.post('/signup', async (req, res) => {
    //input validation
    const requiredUser = z.object({
        username: z.string().min(6, {error: "minimum 6 char unsername"}), 
        password: z.string().min(6, {error: "minimum 6 char password"}).refine((pass) => {
            return pass.split("").some(ch =>  ch >= 'A' && ch <= 'Z');
        }, {
            error: "must contain one uppercase"
        })
        .refine((pass) => {
            return pass.split("").some(ch => ch >= 'a' && ch <= 'z'); 
        }, {
            error: "must conatain one lowercase"
        })
        .refine((pass) => {
            return pass.split("").some(ch => !(
                (ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z') || 
                (ch >= '0' && ch <= '9')
            ))
        }, {
            error: "must contain one special char"
        }),
        email: z.string().email({error: "invalid error"})
    })
    
    const result = requiredUser.safeParse(req.body);

    // result.error.issues has all ther errors as a object
    if(!result.success) return res.status(404).send({ msg: result.error.issues.map(issue => issue.message) })

    const { username, password, email } = result.data;
    try {
        if (!username || !password || !email) {
            return res.status(400).send({ msg: "username, password, and email are required" });
        }

        // we have implemented bcrypt in db.js as pre save
        let user = new User(req.body);
        const saved = await user.save();

        return res.send({ msg: "user created", saved });
    } catch (err) {
        return res.status(404).send({ msg: "user already exists", err: err.message })
    };
})
app.post('/signin', async (req, res) => {

    const signinSchema = z.object({
        username: z.string({error : "Should be string"}), 
        password:  z.string().min(8, {error: "Atleast 8 charcater long"})
    })

    const result = signinSchema.safeParse(req.body);

    if(!result.success) return res.status(404).send({msg: result.error.issues.map(issue => issue.message)});

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ msg: "username and password are required" });
    }

    try {
        const user = await User.findOne({ username });
        const isValid = await bcrypt.compare(password, user.password); 
        if (!user || !isValid) {
            return res.status(403).send({ msg: "incorrect username or password" })
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET)
        return res.send({ msg: "sign in..", token, userId: user._id });

    } catch (err) {
        return res.status(403).send({ msg: "user not found" + err.message });
    }

})



// proteced routes 
app.use((req, res, next) => {
    const [scheme, token] = req.headers['authorization'].split(" ");
    if (scheme != 'Bearer' || !token) return res.status(401).send({ msg: "Invalid token" });

    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decode.username;
        next();
    } catch (err) {
        return res.status(403).send({ msg: "unauthorized" });
    }
})


app.post('/todo', async (req, res) => {
    const { task, done } = req.body;
    if (!task) return res.status(404).send({ msg: "no task is given" })

    try {

        let username = req.username;

        const user = await User.findOne({ username });

        let todo = await Todo.create({
            task, done, userId: user._id
        });

        return res.send({ msg: "todo created", todo: { id: todo._id, task, userId: user._id } });
    } catch (err) {
        return res.status(402).send({ msg: err.message })
    }
})

app.put('/todo/:id', async (req, res) => {
    const { task, done } = req.body;

    if (task === undefined && done === undefined) {
        return res.status(400).send({ msg: "task or done is required" });
    }

    try {
        const user = await User.findOne({ username: req.username });
        if (!user) return res.status(404).send({ msg: "user not found" });

        const updates = {};
        if (task !== undefined) updates.task = task;
        if (done !== undefined) updates.done = done;

        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: user._id },
            { $set: updates },
            { returnDocument: 'after', runValidators: true }
        );

        if (!todo) return res.status(404).send({ msg: "todo not found" });
        return res.send({ msg: "todo updated", todo });
    } catch (err) {
        return res.status(400).send({ msg: err.message });
    }
})

app.get('/todos', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.username });
        if (!user) return res.status(404).send({ msg: "user not found" });

        const todos = await Todo.find({ userId: user._id });
        return res.send({ todos });
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
})

app.listen(3000, () => console.log("server running.."))
