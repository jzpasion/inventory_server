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

module.exports = router;