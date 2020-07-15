const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    date: String,
    body: String,
    beach: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beach',
    }],
});


// Establish and Export Model 
module.exports = mongoose.model('Comment', commentSchema);