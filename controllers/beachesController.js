const express = require("express");
const db = require("../models");
const router = express.Router();
const methodOverride = require("method-override");

// ----- Routes ----- //

// NEW
router.get("/new", (req, res) => {
  db.COUNTY.find({}, (err, counties) => {
    if (err) console.log(err);
    res.render("new", { counties });
  });
});

// ADD
router.post("/", (req, res) => {
  db.BEACH.create(req.body, (err, newBeach) => {
    if (err) console.log(err);
    db.COUNTY.findById(req.body.countyId, (err, foundCounty) => {
      if (err) console.log(err);
      foundCounty.beaches.push(newBeach);
      foundCounty.save((err, savedCounty) => {
        if (err) console.log(err);
        console.log("savedCounty:", savedCounty);
        res.redirect("/beaches");
      });
    });
  });
});

// SHOW
router.get("/:id", (req, res) => {
  db.BEACH.findById(req.params.id)
  .populate('comments')
  .exec((err, foundBeach) => {
      if (err) console.log(err);
      res.render("show", {
          beach: foundBeach,
        });
      });
  });

// INDEX
router.get("/", (req, res) => {
  db.BEACH.find({}, (err, allBeaches) => {
    if (err) return console.log(err);
    res.render("index", {
      beaches: allBeaches,
    });
  });
});

// EDIT
router.get("/:id/edit", (req, res) => {
  db.COUNTY.find({}, (err, allCounties) => {
    db.COUNTY.findOne({ beaches: req.params.id })
      .populate({
        path: "beaches",
        match: { _id: req.params.id },
      })
      .exec((err, foundBeachCounty) => {
        if (err) console.log(err);
        res.render("edit", {
          beach: foundBeachCounty.beaches[0],
          counties: allCounties,
          beachCounty: foundBeachCounty,
        });
      });
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  db.BEACH.findByIdAndUpdate(
    req.params.id, // find by id
    req.body, // update by id
    { new: true }, // show the new object, not the old one
    (err, updatedBeach) => {
      if (err) return console.log(err);
      db.COUNTY.findOne({ beaches: req.params.id }, (err, foundBeachCounty) => {
        if (foundBeachCounty._id.toString() !== req.body.countyId) {
          foundBeachCounty.beaches.remove(req.params.id);
          foundBeachCounty.save((err, savedCounty) => {
            db.COUNTY.findById(req.body.countyId, (err, newCounty) => {
              newCounty.beaches.push(updatedBeach);
              newCounty.save((err, savedNewBeach) => {
                res.redirect(`/beaches/${req.params.id}`);
              });
            });
          });
        } else {
          res.redirect(`/beaches/${req.params.id}`);
        }
      });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.BEACH.findByIdAndDelete(req.params.id, (err, deleteBeach) => {
    if (err) return console.log(err);
    console.log("Deleted Beach:", deleteBeach);
    res.redirect("/beaches");
  });
});

// ----- Export Controller ----- //

// ----------------- Comments

// NEW COMMENT FORM ON BEACHES SHOW PAGE
router.get("/:beachid/comments/new", (req, res) => {
  db.BEACH.findById(req.params.id, (err, foundBeach) => {
    console.log(foundBeach);
    if (err) console.log(err);
    res.render("./comments/new");
  });
});

// CREATE NEW COMMENT AND PUSH TO BEACH.COMMENTS ARRAY
router.post("/:beachid/comments/new", (req, res) => {
  db.COMMENT.create(req.body, (err, newComment) => {
    if (err) return console.log(err);
    console.log(req.params.beachid);
    db.BEACH.findById(req.params.beachid, (err, foundBeach) => {
      if (err) return console.log(err);
      foundBeach.comments.push(newComment);
      foundBeach.save((err, savedBeach) => {
        if (err) return console.log(err);
        console.log(savedBeach);
        res.redirect("/comments");
      });
    });
  });
});

// ----- Export Controller ----- //

module.exports = router;
