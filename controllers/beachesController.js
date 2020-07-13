// ------------------- Simple Routes ------------------- //
// CURRENT PATH = '/beaches'

const express = require('express'); // get the express methods to work on this page
const db = require('../../../lessons/fullstack-dev/SoCalSurf/models'); // get into out database .. to get out of the current directory
const router = express.Router(); // this is an express method we must define
const methodOverride = require('method-override'); // import node packages 

// ----- Routes ----- // 

// new (GET)
router.get('/new', (req, res) => {
    res.render('new')
});


// create (POST)
router.post('/', (req, res) => {
    db.BEACH.create(req.body), (err, newBeach) => {
        if (err) return console.log(err);
        res.redirect('/beaches');
    };
});


// show (GET)
router.get('/:id', (req, res) => {
    db.BEACH.findById(req.params.id, (err, showBeach) => {
        if (err) return console.log(err);
        res.render('show', {
            beach: showBeach,
        });
    });
});


// index (done)
router.get('/', (req, res) => {
    db.BEACH.find({}, (err, allBeaches) => {
        if (err) return console.log(err);
        res.render('index', {   
            beaches:allBeaches, 
        })
    });
});


// edit (works in tandem with update) (done)
router.get('/:id/edit', (req, res) => {
    db.BEACH.findById(req.params.id, (err, foundBeachToEdit) => {
        if (err) return console.log(err);
        res.render('edit', {
            beach: foundBeachToEdit,
        });
    });
});


// update (done)
router.post('/:id', (req, res) => {
    db.BEACH.findByIdAndUpdate(
        req.params.id, // find by id
        req.body, // update by id 
        {new: true}, // show the new object, not the old one
        (err, updatedBeach) => { // callback function 
            if (err) return console.log(err);
            updatedBeach.update({}); // says to update the object with the new information we inputted 
            res.redirect('/beaches'); // redirect to the beaches page
        }
    );
});


// destroy
router.delete('/:id', (req, res) => {
    db.BEACH.findByIdAndDelete(
        req.params.id,
        (err, deleteBeach) => {
            if(err) return console.log(err);
            console.log('Deleted Beach:', deleteBeach);
            res.redirect('/beaches');
        });
});


// ----- Export Controller ----- // 

module.exports = router;