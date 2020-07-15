const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
        minlength: 4,
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    beaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beach',
    }],
    comments :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {timestamps: true});


// Establish and Export Model 
module.exports = mongoose.model('User', userSchema);