const express = require('express'); 
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const router = express.Router(); 
const methodOverride = require('method-override');
// current path +  /api/vi
// API Routes Always Respond with Json

router.get('/beaches/:id', (req,res)=> {
    db.BEACH.findById(req.params.id, (err, likedBeach) =>{
        if (err) res.status(400).json(err);
        db.USER.likedBeaches.push(likedBeach);
        res.json(likedBeach);
    })
});

// ----- Export Controller ----- // 

module.exports = router;
