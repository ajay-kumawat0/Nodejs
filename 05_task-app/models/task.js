const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
})


const task = mongoose.model('task', taskSchema);
module.exports = task;