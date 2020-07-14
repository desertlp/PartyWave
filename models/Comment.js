const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    date: String,
    body: String,
});


// Establish and Export Model 
module.exports = mongoose.model('Comment', commentSchema);