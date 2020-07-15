const express = require("express");
const app = express();
const session = require('express-session');
const db = require("./models");
const PORT = process.env.PORT || 4000;
const methodOverride = require("method-override");
require('dotenv').config();


// Controller(s)
const beachesController = require("./controllers/beachesController"); // import routes
const commentsController = require("./controllers/commentsController");
const usersController = require("./controllers/usersController");
const authController = require("./controllers/authController");

// Set View Engine
app.set("view engine", "ejs");



// MiddleWare
app.use(express.static(`${__dirname}/public`)); //Set Static Assets
app.use(methodOverride("_method")); // method-override
app.use(express.urlencoded({ extended: false })); // body parser
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toLocaleTimeString();
  console.log(`${method} ${url} ${timeStamp}`);

  next();
});
app.use(session({
  secret: 'jkhaskjhaskjdahskdjahskjd', // process.env.SESSION_SECRET, // this is encryption and decryption
  resave: false, // do you want to resave the session on every request, no is generally the answer here
  saveUninitialized: false, // do you want to track unauthenicated users? nah
}));

// Home Route (APP.GET)
app.get("/", (req, res) => {res.render("./homepage")});
app.get("/about", (req, res) => {res.render("about")});

// Controller Routes (APP.USE)
app.use("/beaches", beachesController);
app.use("/comments", commentsController);
app.use("/user", usersController);
app.use("/api", authController);

//404 Route (GET)
app.get("*", (req, res) => {res.send("<h1>404 Error.... Page Not Found.</h1>")});


// Querying 



// Start Server Listener
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));
