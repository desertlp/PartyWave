const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// ----- Routes ----- // 

// NEW (DONE)
router.get("/new", (req, res) => {res.render("./user/new")});


// CREATE 
router.post("/", (req, res) => {
    db.USER.create(req.body, (err, newUser) => {
        if (err) return console.log(err);
        res.redirect("/user");
    });
});


// SHOW (DONE)
router.get('/:id', (req, res) => {
    db.USER.findById(req.params.id, (err, showUser) => {
        if (err) return console.log(err);
        res.render('./user/show', {
            user: showUser,
        });
    });
});


// INDEX (DONE)
router.get('/', (req, res) => {
    db.USER.find({}, (err, allUsers) => {
        if (err) return console.log(err);
        res.render('./user/index', {   
            users:allUsers, 
        })
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


// ----- Export Controller ----- // 

module.exports = router;
