const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// LOGIN 

router.post("/login", (req, res) => { // this needs to link to the homepage
    console.log(req.body);
    // Verify req.body Is Not Empty
    // Find One User By Email
    // If No User Found, Respond with 400
    // Compare Password Sent Password and foundUser Password
    // If Passwords Match, Create Session and Respond with 200
    // If Passwords Do Not Match, Respond with 400
    // Find User By Email Address
  db.USER.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Respond with 400 If No User Found
    if (!foundUser) {
      return res.send('No User Found');
      // says we dont have the user 
    }
    // Compare User Password with foundUser Password
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);
      // Create Session and Respond with 200 If Passwords Match
      if (isMatch) {
        // Create currentUser Object (Hide User Password)
        const currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstNname,
          lastName: foundUser.lastName,
          email: foundUser.email,
          username: foundUser.username,
        }
        // Create A New Session and Respond 200
        req.session.currentUser = currentUser; // currentuser variable name is a best practice
        res.redirect('/user');
      } else {
        // Respond with 400 If Passwords Do Not Match
        return res.send('Invalid Credentials');
      }
    });
  });
})


// Logout 
router.get('/logout', (req, res) => {
    if(!req.session.currentUser) return res.send('youmust be logged in to log out');
    req.session.destroy((err) => {
        if(err) return console.log(err);
        res.redirect('/'); // direct to homepage on logout
    })
});


// ----- Export Controller ----- // 

module.exports = router;
