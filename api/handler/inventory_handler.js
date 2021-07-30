var mysql = require('mysql');
var config = require('../config');

var con = mysql.createConnection(config.dbConfig);

con.connect(function(err){
   if(err) throw err
})

exports.getAllInventory = function(cb){
    var sql = `SELECT * FROM inventory_table`;

    con.query(sql , function(err, result){
        if(err){
            cb({status: "failed" , error:err});
        }else{
            cb(null, result);
        }
    })
}