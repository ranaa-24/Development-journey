const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email : {type : String, unique : true, lowercase : true, trim : true}, 
    password : String, 
    firstName : String, 
    lastName : String
});

module.exports = mongoose.model('Admins', adminSchema);