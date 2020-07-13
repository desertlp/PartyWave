const mongoose = require('mongoose');

const countySchema = new mongoose.Schema({
    name: String,
    lattitude: String, 
    longitude: String,
    beaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beach',
    }],
});


// Establish and Export Model 
module.exports = mongoose.model('County', countySchema);