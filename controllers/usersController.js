const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// ----- Routes ----- // 

// // login opath is the submit button on the homepage 
// router.get('/', (req, res) => {
//     res.render('user/login');
// });

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


// Login // this needs to link to the homepage

router.post("/login", (req, res) => { // this needs to link to the homepage
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
        res.redirect('/profile');
      } else {
        // Respond with 400 If Passwords Do Not Match
        return res.send('Invalid Credentials');
      }
    });
  });
})


// Profile (BUGGY)
router.get('/', (req, res) => {
    db.USER.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);
        res.render('./user/show', {
            user: foundUser,
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


// // INDEX (DONE)
// router.get('/', (req, res) => {
//     db.USER.find({}, (err, allUsers) => {
//         if (err) return console.log(err);
//         res.render('./user/index', {   
//             users:allUsers, 
//         })
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
