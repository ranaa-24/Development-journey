const mongoose = require('mongoose');

async function conn(){
    return mongoose.connect('mongodb+srv://rana24:1d5i4mKZAzYRbYdK@cluster0.q1jdeuo.mongodb.net/Practic')
} 

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
    }
});

const todoSchema = mongoose.Schema({
    task: String, 
    done: Boolean, 
    userId: mongoose.Types.ObjectId
})


const User = mongoose.model('user', userSchema);
const Todo = mongoose.model('todo', todoSchema);

module.exports = {conn, User, Todo}
