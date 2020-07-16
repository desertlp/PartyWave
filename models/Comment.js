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



module.exports = mongoose.model('Comment', commentSchema);