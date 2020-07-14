const express = require("express"); // import express
const app = express(); // create an app level object of express
const PORT = 4000;

const methodOverride = require("method-override");

// Controller(s)
const beachesController = require("./controllers/beachesController"); // import routes

// Set View Engine
app.set("view engine", "ejs");

// MiddleWare
app.use(methodOverride("_method")); // method-override
app.use(express.urlencoded({ extended: false })); // body parser
app.use((req, res, next) => {
  // method/timestamp
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toLocaleTimeString();
  console.log(`${method} ${url} ${timeStamp}`);
  next();
});

//Ser static Assets
app.use(express.static(`${__dirname}/public`));
// Home Route (GET)
app.get("/", (req, res) => {
  res.render("./homepage");
});

// Controller Routes (USE)
app.use("/beaches", beachesController); //

//404 Route (GET)
app.get("*", (req, res) => {
  res.send("<h1>404 Error.... Page Not Found.</h1>");
});

// Start Server Listener
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));
