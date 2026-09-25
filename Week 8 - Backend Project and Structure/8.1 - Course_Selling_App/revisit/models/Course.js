const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    price: Number,
    imageUrl: String,  // user hi url dega
    creator: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    }
})

module.exports = mongoose.model('course', courseSchema)