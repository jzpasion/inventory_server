var handler = require("../handler/inventory_handler");
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({ extended: false }));

router.get("/getInventory", (req, res) => {
    handler.getAllInventory(function (err, data) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(data);
        }
    })
})

router.post("/addInventory", (req, res) => {
    const item_name = req.body.item_name;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const unit_of_measure = req.body.unit_of_measure;
    const unit_price = req.body.unit_price;
    const total = req.body.total;
    if (item_name && type && quantity && unit_of_measure && unit_price && total) {
        handler.addInventory(item_name, type, quantity, unit_of_measure, unit_price, total, function (err, data) {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(500).json({ message: "Invalid Parameters!" });
    }

})

module.exports = router;