const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : [3, "minimum length should be 3 chars"],
        maxLength : [50, "max length cannot exceed 50 chars"],
    },
    email : {
        type : String,
        unique : true,
        required : true,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address example@example.com"
        ],
    },
    password : {
        type : String,
        required: true,
        minLength : [2 , "minimum length should be 2 chars"],
        maxLength : [10, "max length cannot exceed 10 chars" ],
        select : false,
    },
    posts : [{type : mongoose.Schema.Types.ObjectId,ref : 'Post'}],
},
{timestamps : true});

const User = mongoose.model('User', userSchema);
module.exports = User;
