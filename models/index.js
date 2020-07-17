const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/SOCALSURF";

mongoose
  .connect(MONGODB_URI, {
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
