const mongoose = require('mongoose');

function connectDB(url) {
    mongoose.connect(url).then(() => console.log("db conneted!")).catch((err) => console.log("mongo error " + err));
}

module.exports = { connectDB };


