const express = require('express');
const app = express();

const mrs = require("./api/route/mrs_route");
const invetory = require("./api/route/inventory_route");
const department = require("./api/route/department_router");
const project = require('./api/route/project_route');
const user = require('./api/route/user_route');
const purchasing = require('./api/route/purchasing_route')
const mrr = require("./api/route/mrr_route")

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
app.use("/api/inventory", invetory);
app.use("/api/department" , department);
app.use("/api/project" , project);
app.use("/api/user" , user);
app.use("/api/purchasing" , purchasing)
app.use("/api/mrr" , mrr);

module.exports = app;