const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


// Schema--- {fieldName1 : fieldType, ...}
const UserSchema = new Schema({
    email : {type : String, unique : true},
    username : {type : String, unique : true},
    password : String
})

const TodoSchema = new Schema({
    title : String, 
    done :  {type : Boolean, default : false}, 
    userId : ObjectId
})



//Creating a model --> mongoose.model('colletionName', 'schemaOfThatCollection');
const Users = mongoose.model('users', UserSchema);
const Todos = mongoose.model('todos', TodoSchema);

// model enables any operation, on a collection

// we are exporting a Object = {
//     Users : User, 
//     Todos : Todo
// }
module.exports = {
    Users, 
    Todos
}   

