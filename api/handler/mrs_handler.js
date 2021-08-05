var mysql = require("mysql");
var config = require("../config");

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
    if(err) throw err
});

exports.getAllMrs = function (cb) {
    var sql = `SELECT * FROM material_receive_form`;

    con.query(sql, function (err, result) {
        if (err) {
            cb({ status: "Failed", error: err }, null);
        } else {
            cb(null, result);
        }
    });
};

exports.addMrs = function (mrs_number , project_id , department_id , date , item_number , description , quantity , unit , cb){
    var sql = `INSERT INTO material_request_form (MRS_NUMBER , 
                                                  PROJECT_ID,
                                                  DEPARTMENT_ID,
                                                  DATE,
                                                  ITEM_NUMBER,
                                                  DESCRIPTION,
                                                  QUANTITY,
                                                  UNIT)
                VALUES (?,?,?,?,?,?,?,?)`;

    con.query(sql, function(err , result){
        if(err){
            cb({status: 'failed' , error:err })
        }else{
            cb(null,result)
        }
    })

}

