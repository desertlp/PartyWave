const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// LOGIN 
router.post("/login", (req, res) => { 
    console.log(req.body);
  db.USER.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    if (!foundUser) {
      return res.send('No User Found');
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);
      if (isMatch) {
        const currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstNname,
          lastName: foundUser.lastName,
          email: foundUser.email,
          username: foundUser.username,
        }
        req.session.currentUser = currentUser;
        res.redirect('/user');
      } else {
        return res.send('Invalid Credentials');
      }
    });
  });
})

// LOGOUT  ///////////////////// NOT WORKING ///////////////////// RENDERS 404 ERROR PAGE NOT FOUND
router.get('/', (req, res) => {
    if(!req.session.currentUser) return res.redirect('/');
    req.session.destroy((err) => {
        if(err) return console.log(err);
        res.redirect('/'); // this should direct to homepage on logout
    })
});




module.exports = router;