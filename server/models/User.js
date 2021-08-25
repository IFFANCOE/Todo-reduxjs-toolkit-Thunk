const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    },
    token:{
        type:String
    }
},{
    collection:"Users"
})

module.exports= mongoose.model("User ",userSchema)