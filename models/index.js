const mongoose = require('mongoose'); 
const MONGODB_URI = 'mongodb://localhost:27017/partyWave'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,    
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => console.log(`MongoDB connection failed: ${err}`));

module.exports = {
    BEACH: require('./Beach'), 
    
};
