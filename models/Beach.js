const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
    name: String,
    streetAddress: String,
    city: String, 
    zip: Number,
    surflineSrc: String,
    surfCamSrc: String,
    county: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County', 
    }],
    comments :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});


// Establish and Export Model 
module.exports = mongoose.model('Beach', beachSchema);