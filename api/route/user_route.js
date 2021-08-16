var handler = require("../handler/user_handler")
var express = require('express')
var router = express.Router()
var bodyparser = require("body-parser")
router.use(bodyparser.urlencoded({extended: false}))

router.get("/getUser/:username/:password",(req ,res )=>{
    const username = req.params.username
    const password = req.params.password

    if(username && password){
        handler.getUser(username,password,function(err,data){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(200).json(data)
            }
        })

    }else{
        res.status(500).json({message:'Invalid Parameters'});
    }
})

module.exports = router;