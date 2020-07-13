const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
    name: String,
    streetAddress: String,
    city: String, 
    zip: Number,
    county: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County', 
    }],    
    surflineSrc: String,
    surfCamSrc: String,
});


// Establish and Export Model 
module.exports = mongoose.model('Beach', beachSchema);