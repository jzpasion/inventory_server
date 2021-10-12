var mysql = require("mysql")
var config = require("../config")

var con = mysql.createConnection(config.dbConfig)

con.connect(function(err){
    if (err) throw err
})

exports.getMRR = function(cb){
    var sql = `SELECT material_receive_form.MRR_ID,material_request_form.MRS_NUMBER, project_table.CODE , project_table.PROJECT_NAME , 
    material_request_form.DESCRIPTION , material_receive_form.QUANTITY , material_request_form.UNIT , material_receive_form.UNIT_COST , 
    material_receive_form.SUB_TOTAL ,material_receive_form.TYPE , material_receive_form.DATE_DELIVERED FROM material_receive_form 
    LEFT JOIN material_request_form ON material_request_form.MRS_ID = material_receive_form.MRR_ID 
    LEFT JOIN project_table ON project_table.PROJECT_ID = material_receive_form.PROJECT_ID`

    con.query(sql,function(err,result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })
}

exports.addMRR = function(prj_id, mrs_id, quantity , unit_cost ,sub_total , type ,  date_delivered ,  cb){
    var sql = `INSERT INTO  material_receive_form (PROJECT_ID,
                                                   MRS_ID,
                                                   QUANTITY,
                                                   UNIT_COST,
                                                   SUB_TOTAL,
                                                   TYPE,
                                                   DATE_DELIVERED)
                VALUES (?,?,?,?,?,?,?)`;

    con.query(sql,[prj_id , mrs_id , quantity , unit_cost , sub_total , type , date_delivered],function(err,result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })
}