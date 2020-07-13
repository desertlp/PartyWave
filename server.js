const express = require("express"); // import express
const app = express(); // create an app level object of express
const db = require('./models'); // get into out database .. to get out of the current directory
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
<<<<<<< HEAD

//Set Static Assets
app.use(express.static(`${__dirname}/public`))});
=======
});
>>>>>>> Will

//Ser static Assets
app.use(express.static(`${__dirname}/public`));
// Home Route (GET)
app.get("/", (req, res) => {
  res.send("Homepage");
});

// Controller Routes (USE)
app.use("/beaches", beachesController); //

//404 Route (GET)
app.get("*", (req, res) => {
  res.send("<h1>404 Error.... Page Not Found.</h1>");
});



// Adding County Data (Querying)
//  const county = {
//   name: 'Ventura County',
//   lattitude: '34.3705° N', 
//   longitude: '119.1391° W',
// };
// db.COUNTY.create(county, (err, newCounty) => {
//   if (err) console.log(err);
//   console.log('New County Created');
//   console.log(newCounty);
//   process.exit();
// });


// Start Server Listener
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));
