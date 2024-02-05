const mongoose = require("mongoose");


const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        text: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],    
    },
    verified: {
        type: Boolean,
        required: [true, "username is required"],
        default: false
    },
}, {
    timestamps:true,
});


module.exports = mongoose.model('User', userSchema)