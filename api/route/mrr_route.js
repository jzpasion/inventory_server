var handler = require("../handler/mrr_handler")
var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({extended: false}))


router.get("/getMRR" , (req , res) =>{
    handler.getMRR(function(err,data){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    })
})

router.post("/addMRR" , (req ,res) =>{
    const prj_id = req.body.prj_id
    const mrs_id = req.body.mrs_id
    const quantity = req.body.quantity
    const unit_cost = req.body.unit_cost
    const sub_total = req.body.grand_total
    const date_delivered = req.body.date_delivered

    if(prj_id && mrs_id && quantity && unit_cost && sub_total && date_delivered){
        handler.addMRR(prj_id , mrs_id, quantity, unit_cost , sub_total,date_delivered,  function(err,data){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(200).json(data)
            }
        })
    }else{
        res.status(500).json({message: 'Invalid Parameters!'})
    }
})

module.exports = router;