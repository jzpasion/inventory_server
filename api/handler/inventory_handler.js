var mysql = require('mysql');
var config = require('../config');

var con = mysql.createConnection(config.dbConfig);

con.connect(function (err) {
    if (err) throw err
})

exports.getAllInventory = function (cb) {
    var sql = `SELECT * FROM inventory_table`;

    con.query(sql, function (err, result) {
        if (err) {
            cb({ status: "failed", error: err });
        } else {
            cb(null, result);
        }
    })
}

exports.addInventory = function (item_name, type, quantity, unit_of_measure, unit_price, total, cb) {
    const sql = `INSERT INTO inventory_table (ITEM_NAME,
                                             TYPE,
                                             QUANTITY,
                                             UOM,
                                             UNIT_PRICE,
                                             TOTAL)
                    VALUES (?,?,?,?,?,?) `;
    con.query(sql, [
        item_name,
        type,
        quantity,
        unit_of_measure,
        unit_price,
        total],
        function (err, result) {
            if (err) {
                cb({ status: "failed", error: err }, null);
            } else {
                cb(null, result);
            }
        }
    )
}

exports.updateInventory = function (item_name, type, quantity, unit_of_measure, unit_price, total, id, cb) {
    const sql = `UPDATE inventory_table SET ITEM_NAME = ?,
                                            TYPE = ?,
                                            QUANTITY = ?,
                                            UOM = ?,
                                            UNIT_PRICE = ?,
                                            TOTAL = ?
                WHERE ID = ?`
    con.query(sql, [item_name, type, quantity, unit_of_measure, unit_price, total, id], function (err, result) {
        if (err) {
            cb({ status: "failed", error: err }, null)
        } else {
            cb(null, result)
        }
    })
}