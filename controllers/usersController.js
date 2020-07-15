const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// ----- Routes ----- // 


// Profile (BUGGY)
router.get('/', (req, res) => {
    db.USER.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);
        res.render('./user/show', {
            user: foundUser,
        });
    });
});

// GO TO NEW USER PAGE (DONE)
router.get("/new", (req, res) => {res.render("./user/new")});


// CREATE NEW USER (DONE)
router.post("/", (req, res) => {
    // Verify req.body Is Not Empty
  // Query DB For Existing User By Email
  // If foundUser, Respond with 400
  // If No foundUser, Generate Salt and Hash User Password
  // Replace newUser Plain Text Password with Hased Password
  // Create newUser and Respond with 200
  // Check For Existing User Account
  db.USER.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Return Error If Account Already Exists
    if (foundUser) return console.log('User Already Exsists');
    // Generate Hash Salt (This just makes the password hard to crack)
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);
      // Turn the Plain Text Password Into A Complicated Hash
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);
        // Destructure New User Data From Request
        const {username, password, firstName, lastName, email } = req.body;
        // Construct New User Object with Hashed Password
        const newUser = {
          username,
          password: hash, // VERY IMPORTANT! NEVER SAVE PLAIN TEXT PASSWORD
          firstName,
          lastName, 
          email,
        };
        // Create New User
        db.USER.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
          res.redirect('/');
        });
      });
    });
  });
});


// // SHOW (DONE)
// router.get('/:id', (req, res) => {
//     db.USER.findById(req.params.id, (err, showUser) => {
//         if (err) return console.log(err);
//         res.render('./user/show', {
//             user: showUser,
//         });
//     });
// });



// EDIT (DONE)
router.get('/:id/edit', (req, res) => {
    db.USER.findById(req.params.id, (err, foundUserToEdit) => {
        if (err) return console.log(err);
        res.render('./user/edit', {
            user: foundUserToEdit,
        });
    });
});


// UPDATE (DONE)
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    db.USER.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedUser) => {  
            console.log(updatedUser);
            if (err) return console.log(err);
            updatedUser.update({}); 
            res.redirect('/user'); 
        }
    );
});


// DELETE (DONE)
router.delete('/:id', (req, res) => {
    db.USER.findByIdAndDelete(
        req.params.id,
        (err, deleteUser) => {
            if(err) return console.log(err);
            console.log('Deleted User:', deleteUser);
            res.redirect('/user');
        });
});



// ----- Export Controller ----- // 

module.exports = router;
