var mysql = require("mysql");
var config = require("../config");

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
    if(err) throw err
});

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

exports.getMrsPurchasing = function(cb){
    var sql = `SELECT material_request_form.MRS_ID,department_table.COMPANY ,project_table.CODE,material_request_form.DESCRIPTION , 
    material_request_form.QUANTITY,material_request_form.UNIT,department_table.DEPARTMENT_NAME
    FROM material_request_form LEFT JOIN department_table ON material_request_form.DEPARTMENT_ID = department_table.DEPARTMENT_ID
     LEFT JOIN project_table on material_request_form.PROJECT_ID = project_table.PROJECT_ID`

     con.query(sql , function(err,result){
         if(err){
            cb({status:'failed' , error:err})
         }else{
            cb(null,result)
         }
     })
}

exports.addMrs = function ( mrs_number,request_by ,project_id , department_id  , date , item_number , description , quantity , unit , cb){
    var sql = `INSERT INTO material_request_form (MRS_NUMBER,
                                                  REQUEST_BY,
                                                  PROJECT_ID,
                                                  DEPARTMENT_ID,
                                                  DATE,
                                                  ITEM_NUMBER,
                                                  DESCRIPTION,
                                                  QUANTITY,
                                                  UNIT)
                VALUES (?,?,?,?,?,?,?,?)`;

    con.query(sql ,[mrs_number, request_by,project_id , department_id , date , item_number , description , quantity , unit] ,function(err , result){
        if(err){
            cb({status: 'failed' , error:err })
        }else{
            cb(null,result)
        }
    })

}

