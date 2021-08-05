var handler = require('../handler/department_handler')
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({ extended: false }));

router.get("/getDepartment" , (req ,res) =>{
    handler.getAllDepartment(function(err ,data){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    })
})

module.exports = router;