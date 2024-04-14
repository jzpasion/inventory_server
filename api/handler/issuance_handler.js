var mysql = require("mysql");
var config = require("../config");

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
  if (err) throw err;
});

exports.getAllIssuance = function (cb) {
  var sql = `SELECT issuance_report.ISSUANCE_ID , issuance_report.MRS_NUMBER ,issuance_report.REQUEST_BY , project_table.CODE ,project_table.PROJECT_NAME , 
    department_table.DEPARTMENT_NAME , department_table.COMPANY , issuance_report.DATE , issuance_report.ITEM_NUMBER, 
    issuance_report.DESCRIPTION,issuance_report.QUANTITY,issuance_report.UNIT , issuance_report.TYPE
    FROM issuance_report LEFT JOIN project_table ON issuance_report.PROJECT_ID = project_table.PROJECT_ID 
    LEFT JOIN department_table ON issuance_report.DEPARTMENT_ID = department_table.DEPARTMENT_ID`;

  con.query(sql, function (err, result) {
    if (err) {
      cb({ status: "failed", error: err });
    } else {
      cb(null, result);
    }
  });
};

exports.addIssuance = function (
  mrs_number,
  request_by,
  project_id,
  department_id,
  date,
  item_number,
  description,
  quantity,
  unit,
  type,
  cb
) {
  var sql = `INSERT INTO issuance_report (MRS_NUMBER ,
                                            REQUEST_BY,
                                            PROJECT_ID,
                                            DEPARTMENT_ID,
                                            DATE,
                                            ITEM_NUMBER,
                                            DESCRIPTION,
                                            QUANTITY,
                                            UNIT,
                                            TYPE,
                                            DATE_ADDED)
                VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;

  con.query(
    sql,
    [
      mrs_number,
      request_by,
      project_id,
      department_id,
      date,
      item_number,
      description,
      quantity,
      unit,
      type,
    ],
    function (err, result) {
      if (err) {
        cb({ status: "failed", error: err });
      } else {
        cb(null, result);
      }
    }
  );
};
