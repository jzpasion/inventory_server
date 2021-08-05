var handler = require("../handler/project_handler");
var express = require("express");
var router = express.Router();
var bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));



router.get('/getProjects' , (req , res) =>{
    handler.getAllProject(function(err, data){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    })
})




module.exports = router