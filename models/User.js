const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    beaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beach',
    }],
    comments :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});


// Establish and Export Model 
module.exports = mongoose.model('User', userSchema);