const express = require("express");
const app = express();
const db = require("./models");
const PORT = 4000;
const methodOverride = require("method-override");

// Controller(s)
const beachesController = require("./controllers/beachesController"); // import routes
const commentsController = require("./controllers/commentsController");
const usersController = require("./controllers/usersController");

// Set View Engine
app.set("view engine", "ejs");



// MiddleWare
app.use(methodOverride("_method")); // method-override
app.use(express.urlencoded({ extended: false })); // body parser
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toLocaleTimeString();
  console.log(`${method} ${url} ${timeStamp}`);

  next();
});

//Set Static Assets
app.use(express.static(`${__dirname}/public`));

// Home Route (APP.GET)
app.get("/", (req, res) => {res.render("./homepage")});
app.get("/about", (req, res) => {res.render("about")});

// Controller Routes (APP.USE)
app.use("/beaches", beachesController);
app.use("/comments", commentsController);
app.use("/user", usersController);

//404 Route (GET)
app.get("*", (req, res) => {res.send("<h1>404 Error.... Page Not Found.</h1>")});


// Querying 



// Start Server Listener
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));
