const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');
// current path +  /api/v1
// API Routes Always Respond with Json

router.get('/api/v1/beaches', (req, res)=> {
    console.log('we think we have it?');
    db.USER.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);
        console.log(foundUser);
        foundUser.beaches.push(req.session.currentUser._id);
        foundUser.save((err, savedUser) => {
            return res.json({ // do i really need return? 
                status: 201,
                data: savedUser,
            });
        });
    });
});




module.exports = router;