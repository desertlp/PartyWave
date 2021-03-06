const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');

// ----- Routes ----- // 

// SHOW
router.get('/:id', (req, res) => {
    db.COMMENT.findById(req.params.id)
    .populate('beach')
    .exec((err, showComment) => {
        if (err) return console.log(err);
        res.render('./comments/show', {
            comment: showComment,
        });
    });
});

// INDEX
router.get('/', (req, res) => {
    db.COMMENT.find({}, (err, allComments) => {
        if (err) return console.log(err);
        res.render('./comments/index', {   
            comments:allComments, 
        })
    });
});


// EDIT
router.get('/:id/edit', (req, res) => {
    if(!req.session.currentUser) return res.redirect('/'); 
    db.COMMENT.findById(req.params.id, (err, foundCommentToEdit) => {
        if (err) return console.log(err);
        res.render('./comments/edit', {
            comment: foundCommentToEdit,
        });
    });
});


// UPDATE
router.put('/:id', (req, res) => {
    if(!req.session.currentUser) return res.redirect('/'); 
    console.log(req.params.id);
    db.COMMENT.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedComment) => {  
            console.log(updatedComment);
            if (err) return console.log(err);
            updatedComment.update({}); 
            res.redirect('/comments/'); 
        }
    );
});


// DELETE
router.delete('/:id', (req, res) => {
    if(!req.session.currentUser) return res.redirect('/'); 
    db.COMMENT.findByIdAndDelete(
        req.params.id,
        (err, deleteComment) => {
            if(err) return console.log(err);
            console.log('Deleted Comment:', deleteComment);
            res.redirect('/comments');
        });
});




module.exports = router;
