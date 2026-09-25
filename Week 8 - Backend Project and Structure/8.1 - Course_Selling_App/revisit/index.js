const express = require('express');
const {connectDB} = require('./utils/connetions') 
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouters');
const authenticate = require('./middlewares/auth.user');
const courseRouter = require('./routes/courseRouter');
const adminRouter = require('./routes/adminRouter')

const app = express();
dotenv.config();
app.use(express.json());

connectDB(process.env.MONGO_URL)

app.get('/', (req, res) => {
    return res.send({msg: "welcome to xcin project"})
});

// user/signup, user/sigin, /user/purchases 
app.use('/user', userRouter);
// done 
app.use('/admin', adminRouter);

// ----------------------------------------
// TODOs: /user/purchases and the bellow are need to define and also the coursses and ppurchases models
// ----------------------------------------

// /course/purchase, /courses/  --> get all courses 
app.use('/courses', authenticate, courseRouter)








app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || err.statusCode || 500;
    return res.status(status).json({
        error: err.message || 'Internal Server Error',
        path: req.path
    });
});

app.listen(3000, ()=>console.log("server is up.."))