const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    originalUrl: String, 
    shortCode: String, 
    clicks: Number
});


module.exports = mongoose.model('url', URLSchema);