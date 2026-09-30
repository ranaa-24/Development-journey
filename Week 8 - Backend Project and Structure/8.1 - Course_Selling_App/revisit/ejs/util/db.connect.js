const mongoose = require('mongoose');


async function connectDB(url) {
    mongoose.connect(url).then(()=>console.log("Db connected")).catch((err) => console.log("DB Connection error"));
}

module.exports = connectDB