var mysql = require("mysql");
var config = require("../config");

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
  if (err) throw err;
});

exports.getAllProject = function (cb) {
  var sql = `SELECT * FROM project_table`;

  con.query(sql, function (err, result) {
    if (err) {
      cb({ status: "failed", error: err });
    } else {
      cb(null, result);
    }
  });
};
exports.addProject = function (code, project_name, start_date, end_date, cb) {
  var sql = `INSERT INTO project_table (CODE,
                                          PROJECT_NAME,
                                          START_DATE,
                                          END_DATE,
                                          DATE_ADDED)
                VALUES(?,?,?,?,CURRENT_TIMESTAMP())`;

  con.query(
    sql,
    [code, project_name, start_date, end_date],
    function (err, result) {
      if (err) {
        cb({ status: "failed", error: err });
      } else {
        cb(null, result);
      }
    }
  );
};

exports.updateProject = function (
  code,
  client,
  park,
  country,
  project_name,
  start_date,
  end_date,
  prj_id,
  cb
) {
  var sql = `UPDATE project_table SET CODE = ?,
                                        CLIENT = ?,
                                        PARK = ?,
                                        COUNTRY = ?,
                                        PROJECT_NAME = ?,
                                        START_DATE = ?,
                                        END_DATE = ?
                WHERE PROJECT_ID = ?`;
  con.query(
    sql,
    [code, client, park, country, project_name, start_date, end_date, prj_id],
    function (err, result) {
      if (err) {
        cb({ status: "failed", error: err });
      } else {
        cb(null, result);
      }
    }
  );
};
