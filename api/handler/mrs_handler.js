var mysql = require('mysql');
var config = require('../config');

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
    if (err) throw err
})

exports.getAllMrs = function (cb) {
    var sql = `SELECT * FROM material_request_form`;

    con.query(sql, function (err, result) {
        if (err) {
            cb({ status: "Failed", error: err }, null);
        } else {
            cb(null, result);
        }
    });
};

exports.getMrsDetailed = function(cb){
    var sql = `SELECT material_request_form.MRS_ID , material_request_form.MRS_NUMBER ,material_request_form.REQUEST_BY , project_table.CODE ,project_table.PROJECT_NAME , 
    department_table.DEPARTMENT_NAME , department_table.COMPANY , material_request_form.DATE , material_request_form.ITEM_NUMBER, 
    material_request_form.DESCRIPTION,material_request_form.QUANTITY,material_request_form.UNIT ,material_request_form.TYPE
    FROM material_request_form LEFT JOIN project_table ON material_request_form.PROJECT_ID = project_table.PROJECT_ID 
    LEFT JOIN department_table ON material_request_form.DEPARTMENT_ID = department_table.DEPARTMENT_ID`

    con.query(sql,function(err,result){
        if(err){
            cb({status: 'failed' , error:err})
        }else{
            cb(null,result);
        }
    })
}

exports.getMrsPurchasing = function(cb){
    var sql = `SELECT purchasing_table.PURCHASING_ID,department_table.COMPANY,material_request_form.REQUEST_BY, department_table.DEPARTMENT_NAME, 
    purchasing_table.PRS_NUMBER, material_request_form.MRS_NUMBER , project_table.PROJECT_NAME, material_request_form.DESCRIPTION ,
    material_request_form.QUANTITY , material_request_form.UNIT ,purchasing_table.UNIT_PRICE , purchasing_table.TOTAL_PRICE , purchasing_table.SUPPLIER , 
    purchasing_table.DATE_REQUEST , purchasing_table.DATE_DELIVERED FROM purchasing_table 
    LEFT JOIN material_request_form ON purchasing_table.MRS_ID = material_request_form.MRS_ID 
    LEFT JOIN department_table ON material_request_form.DEPARTMENT_ID = department_table.DEPARTMENT_ID 
    LEFT JOIN project_table ON purchasing_table.PROJECT_ID = project_table.PROJECT_ID`

     con.query(sql , function(err,result){
         if(err){
            cb({status:'failed' , error:err})
         }else{
            cb(null,result)
         }
     })
}

exports.addMrs = function ( mrs_number,request_by ,project_id , department_id  , date , item_number , description , quantity , unit , type , cb){
    var sql = `INSERT INTO material_request_form (MRS_NUMBER,
                                                  REQUEST_BY,
                                                  PROJECT_ID,
                                                  DEPARTMENT_ID,
                                                  DATE,
                                                  ITEM_NUMBER,
                                                  DESCRIPTION,
                                                  QUANTITY,
                                                  UNIT,
                                                  TYPE)
                VALUES (?,?,?,?,?,?,?,?,?,?)`;

    con.query(sql ,[mrs_number, request_by,project_id , department_id , date , item_number , description , quantity , unit , type] ,function(err , result){
        if(err){
            cb({status: 'failed' , error:err })
        }else{
            cb(null,result)
        }
    })

}

