const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    date: {
        type: Date, 
        default: Date.now
    },
    body: String,
    beach: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beach',
    }],
}, {timestamps: true});



module.exports = mongoose.model('Comment', commentSchema);