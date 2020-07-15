const mongoose = require("mongoose"); // import mongoose and its methods
const MONGODB_URI = "mongodb://localhost:27017/SOCALSURF";

mongoose
  .connect(MONGODB_URI, {
    // mongodb is a secondary server, must connect to it liketwe do with server.js
    // first argument: connectionstring
    // second argument: deprecation warnings (google this often)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(`MongoDB connection failed: ${err}`));

module.exports = {
  BEACH: require("./Beach"),
  COUNTY: require("./County"),
  COMMENT: require("./Comment"),
  USER: require("./User"),
};
