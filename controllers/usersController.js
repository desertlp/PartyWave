const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// ----- Routes ----- // 


// PROFILE
router.get('/', (req, res) => {
  if(!req.session.currentUser) return res.redirect('/');
    db.USER.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);
        res.render('./user/show', {
            user: foundUser,
        });
    });
});

// NEW USER PAGE 
router.get("/new", (req, res) => {res.render("./user/new")});


// CREATE NEW USER (DONE)
router.post("/", (req, res) => {
  db.USER.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    if (foundUser) return console.log('User Already Exsists');
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);
        const {username, password, firstName, lastName, email } = req.body;
        const newUser = {
          username,
          password: hash, 
          firstName,
          lastName, 
          email,
        };
        db.USER.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
          res.redirect('/');
        });
      });
    });
  });
});


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




module.exports = router;
