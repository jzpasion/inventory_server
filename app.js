const express = require('express');
const app = express();

const mrs = require("./api/route/mrs_route");
const invetory = require("./api/route/inventory_route");

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTION");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Reqeusted-with-content-type ,Content-type"
    );
    res.setHeader("Access-Controll-Allow-Credentials", true);

    next();

});

app.use(express.json());
app.use("/api", mrs);
app.use("/api", invetory);

module.exports = app;