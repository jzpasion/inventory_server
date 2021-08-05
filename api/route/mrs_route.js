var handler = require("../handler/mrs_handler");
var express = require("express");
var router = express.Router();
var bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));

router.get("/getMRS", (req, res) => {
    handler.getAllMrs(function (err, data) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(data);
        }
    });
});

router.post("/addMRS" , (req ,res ) =>{
    handler.addMrs()
})

module.exports = router;