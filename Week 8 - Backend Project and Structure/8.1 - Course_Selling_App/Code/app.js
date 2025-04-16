const express = require('express');
const userRoutes = require("./routes/userRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require('./connection');
const path = require('path');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json())
app.use(express.urlencoded());
app.use('/home', express.static('public'));      //serving FE on same port OR, Introduce cors()


connectDB(MONGO_URI)
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    })


// all ejs configs should always be in global app, not in routes
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//add prefix to routes
app.use('/api/user', userRoutes);   //✅        // user creates acc
app.use('/api/courses', coursesRoutes);         // user buy courses
app.use('/api/admin', adminRoutes); //✅        // admin stuffs, login to manage courses everything

app.listen(PORT, () => console.log("Server Running on Port " + PORT))

