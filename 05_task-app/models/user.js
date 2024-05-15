const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password : {
        type : String,
        required : true
    }
})


const user = mongoose.model('user', userSchema);
module.exports = user;