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

router.get("/getMrsPurchasing" , (req ,res) =>{
    handler.getMrsPurchasing(function(err,data){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    })
})

router.post("/addMRS" , (req ,res ) =>{
    const mrs_number = req.body.mrs_number
    const project_id = req.body.project_id
    const department_id = req.body.department_id
    const date = req.body.date
    const item_number = req.body.item_number
    const description = req.body.description
    const quantity = req.body.quantity
    const unit = req.body.unit
    if(mrs_number && project_id && department_id && date && item_number && description && quantity && unit ){
        handler.addMrs(mrs_number , project_id , department_id , date , item_number , description , quantity , unit , function(err,data){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(200).json(data)
            }
        })
    }else{
        res.status(500).json({message: 'Invalid Parameters'})
    }
    
})

module.exports = router;