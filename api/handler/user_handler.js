const mysql = require('mysql');
const config = require('../config') 

var con = mysql.createConnection(config.dbConfig)

con.connect(function(err){
    if(err) throw err
})

exports.getUser = function(username , password ,cb){
    var sql = `SELECT * FROM user_table WHERE USERNAME= ? AND PASSWORD= ?`

    con.query(sql,[username,password],function(err,result){
        if(err){    
            cb({status: "failed" , error:err})
        }else{
            cb(null,result)
        }
    })
}