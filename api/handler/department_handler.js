var mysql = require("mysql");
var config = require("../config");

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
  if (err) throw err;
});

exports.getAllDepartment = function (cb) {
  var sql = `SELECT * FROM department_table`;

  con.query(sql, function (err, result) {
    if (err) {
      cb({ status: "failed", error: err });
    } else {
      cb(null, result);
    }
  });
};

exports.getSpecificCompany = function (company, cb) {
  var sql = `SELECT * FROM department_table WHERE COMPANY = '?'`;
  con.query(sql, [company], function (err, result) {
    if (err) {
      cb({ status: "failed", error: err });
    } else {
      cb(null, result);
    }
  });
};

exports.addDepartment = function (dep_name, company, cb) {
  var sql = `INSERT INTO department_table (DEPARTMENT_NAME,
                                             COMPANY,
                                             DATE_ADDED)
                VALUES (?,?,CURRENT_TIMESTAMP())`;
  con.query(sql, [dep_name, company], function (err, result) {
    if (err) {
      cb({ status: "failed", error: err });
    } else {
      cb(null, result);
    }
  });
};
