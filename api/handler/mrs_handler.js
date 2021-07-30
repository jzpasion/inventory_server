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