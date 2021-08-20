var mysql = require('mysql')
var config = require('../config')

var con = mysql.createConnection(config.dbConfig)

con.connect(function(err){
    if(err) throw err
})


exports.getAllPurchase = function(cb){
    var sql =`SELECT purchasing_table.PURCHASING_ID,department_table.COMPANY,material_request_form.REQUEST_BY, department_table.DEPARTMENT_NAME, 
    purchasing_table.PRS_NUMBER, material_request_form.MRS_NUMBER , project_table.PROJECT_NAME, material_request_form.DESCRIPTION , material_request_form.QUANTITY , 
    material_request_form.UNIT ,purchasing_table.UNIT_PRICE , purchasing_table.TOTAL_PRICE , purchasing_table.SUPPLIER , purchasing_table.DATE_REQUEST, 
    purchasing_table.STATUS , purchasing_table.DATE_DELIVERED FROM purchasing_table 
    LEFT JOIN material_request_form ON purchasing_table.MRS_ID = material_request_form.MRS_ID 
    LEFT JOIN department_table ON material_request_form.DEPARTMENT_ID = department_table.DEPARTMENT_ID 
    LEFT JOIN project_table ON purchasing_table.PROJECT_ID = project_table.PROJECT_ID`

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
                                               STATUS,
                                               DATE_DELIVERED)
                VALUES (?,?,?,?,"PENDING FOR APPROVAL","NOT DELIVERED")`
    
    con.query(sql ,[date_request, prs_number,mrs_id,project_id],function(err, result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })

}


exports.updatePRS = function(unit_price , total_price , supplier , status, date_delivered , purchasing_id , cb){
    var sql = `UPDATE purchasing_table SET  UNIT_PRICE=? , 
                                            TOTAL_PRICE = ? , 
                                            SUPPLIER= ? ,
                                            STATUS = ? ,
                                            DATE_DELIVERED = ?
                WHERE PURCHASING_ID = ? `
    
    con.query(sql , [unit_price ,total_price, supplier , status, date_delivered, purchasing_id] , function(err,result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result)
        }
    })
}