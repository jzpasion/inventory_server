var handler = require('../handler/purchasing_handler')
var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({extended: false}))

router.get("/getPRS" , (req , res)=>{
    handler.getAllPurchase(function(err,data){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    })
})

router.post("/addPRS" , (req ,res )=>{
    const date_request = req.body.date_request
    const prs_number = req.body.prs_number
    const mrs_id = req.body.mrs_id
    const project_id = req.body.project_id

    if(date_request && prs_number && mrs_id && project_id){
        handler.addPRS(date_request, prs_number, mrs_id, project_id,function(err,data){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(200).json(data)
            }
        })
    }else{
        res.status(500).json({message: "Invalid Parameters"})
    }
})

router.put("/updatePRS:purchasing_id" , (req ,res) =>{
    const purchasing_id = req.params.purchasing_id
    const unit_price = req.body.unit_price
    const total_price = req.body.total_price
    const supplier = req.body.supplier
    const status = req.body.status
    const date_delivered = req.body.date_delivered

    if(purchasing_id && unit_price && total_price && supplier && status && date_delivered){
        handler.updatePRS(unit_price, total_price,supplier,status, date_delivered, purchasing_id , function(err,data){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(200).json(data)
            }
        })
    }else{
        res.status(500).json({message: 'invalid Parameters!'})
    }
})

module.exports = router;