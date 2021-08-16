var mysql = require('mysql')
var config = require('../config')

var con = mysql.createConnection(config.dbConfig)

con.connect(function(err){
    if(err) throw err
})


exports.getAllPurchase = function(cb){
    var sql =`SELECT purchasing_table.PURCHASING_ID , purchasing_table.DATE_REQUEST , purchasing_table.PRS_NUMBER , 
    material_request_form.MRS_NUMBER , project_table.PROJECT_NAME , purchasing_table.UNIT_PRICE, 
    purchasing_table.TOTAL_PRICE,purchasing_table.SUPPLIER , purchasing_table.STATUS , purchasing_table.DATE_DELIVERED 
    FROM purchasing_table LEFT JOIN material_request_form ON purchasing_table.MRS_ID = material_request_form.MRS_ID 
    LEFT JOIN project_table on purchasing_table.PROJECT_ID = project_table.PROJECT_ID`

    con.query(sql,function(err, result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })
}

exports.addPRS = function(date_request , prs_number , mrs_id , project_id,cb ){
    var sql = `INSERT INTO purchasing_table (DATE_REQUEST,
                                               PRS_NUMBER,
                                               MRS_ID,
                                               PROJECT_ID,
                                               STATUS)
                VALUES (?,?,?,?,"PENDING FOR APPROVAL")`
    
    con.query(sql ,[date_request, prs_number,mrs_id,project_id],function(err, result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })

}