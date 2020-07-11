const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
    name: String,
    streetAddress: String,
    city: String, 
    zip: Number,
    county: String, 
    surflineSrc: String,
    surfCamSrc: String,
});

module.exports = mongoose.model('Beach', beachSchema);