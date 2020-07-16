const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');
// current path +  /api/v1
// API Routes Always Respond with Json

router.get('/beaches/:id', (req,res)=> {
    db.USER.findById(req.params.id, (err, foundUser) => {
        if (err) return console.log(err);
        foundUser.beaches.push(req.params.id);
        foundUser.save((err, savedUser) => {
            return res.json({
                status: 201,
                data: savedUser,
            });
        });
    });
});




module.exports = router;