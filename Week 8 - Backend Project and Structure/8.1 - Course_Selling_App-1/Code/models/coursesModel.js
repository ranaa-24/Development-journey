const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title : String, 
    description : String, 
    price : Number, 
    imgUrl : String, 
    creatorId : mongoose.ObjectId
});

module.exports = mongoose.model('courses', coursesSchema);