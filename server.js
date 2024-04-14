const inventory_handler = require("./api/handler/inventory_handler");
const department_handler = require("./api/handler/department_handler");
const project_handler = require("./api/handler/project_handler");
const MRS_handler = require("./api/handler/mrs_handler");
const user_handler = require("./api/handler/user_handler");
const purchasing = require("./api/handler/purchasing_handler");
const MRR_handler = require("./api/handler/mrr_handler");
const issuance_handler = require("./api/handler/issuance_handler");
const http = require("http");
const port = process.env.PORT || 8081;
const app = require("./app");
const e = require("cors");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const getInventory = async (socket) => {
  inventory_handler.getAllInventory(function (err, data) {
    if (err) {
      throw err;
    } else {
      //console.log(data);
      socket.emit("getInventories", data);
      socket.broadcast.emit("getInventories", data);
    }
  });
};

const getDepartment = async (socket) => {
  department_handler.getAllDepartment(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getDepartments", data);
      socket.broadcast.emit("getDepartments", data);
    }
  });
};

const getProject = async (socket) => {
  project_handler.getAllProject(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getProjects", data);
      socket.broadcast.emit("getProjects", data);
    }
  });
};

const getMrs = async (socket) => {
  MRS_handler.getAllMrs(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getMRS", data);
      socket.broadcast.emit("getMRS", data);
    }
  });
};

const getPurchasing = async (socket) => {
  purchasing.getAllPurchase(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getPurchasing", data);
      socket.broadcast.emit("getPurchasing", data);
    }
  });
};

const getMRR = async (socket) => {
  MRR_handler.getMRR(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getMRR", data);
      socket.broadcast.emit("getMRR", data);
    }
  });
};

const getMRSDetailed = async (socket) => {
  MRS_handler.getMrsDetailed(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getMrsDetailed", data);
      socket.broadcast.emit("getMrsDetailed", data);
    }
  });
};

const getIssuance = async (socket) => {
  issuance_handler.getAllIssuance(function (err, data) {
    if (err) {
      throw err;
    } else {
      socket.emit("getIssuance", data);
      socket.broadcast.emit("getIssuance", data);
    }
  });
};

io.on("connection", (socket) => {
  console.log("user connected");
  getInventory(socket);
  getDepartment(socket);
  getProject(socket);
  getMrs(socket);
  getPurchasing(socket);
  getMRR(socket);
  getMRSDetailed(socket);
  getIssuance(socket);

  socket.on("getIssuanceDetails", () => {
    getIssuance(socket);
  });

  socket.on("getDetailedMrs", () => {
    getMRSDetailed(socket);
  });

  socket.on("getInventory", () => {
    getInventory(socket);
  });

  socket.on("getDepartment", () => {
    getDepartment(socket);
  });

  socket.on("getProject", () => {
    getProject(socket);
  });

  socket.on("getMRSS", () => {
    getMrs(socket);
  });

  socket.on("getAllPurchasing", () => {
    getPurchasing(socket);
  });

  socket.on("getMRRS", () => {
    getMRR(socket);
  });

  socket.on("getUser", function (uname, pword, callback) {
    user_handler.getUser(uname, pword, function (err, data) {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  });

  socket.on(
    "addInven",
    function (item_name, type, quantity, unit_of_measure, unit_price, total) {
      inventory_handler.addInventory(
        item_name,
        type,
        quantity,
        unit_of_measure,
        unit_price,
        total,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_inventory_table", getInventory(socket));
            socket.broadcast.emit(
              "update_inventory_table",
              getInventory(socket)
            );
          }
        }
      );
    }
  );
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });

  socket.on(
    "updateInventory",
    function (
      item_name,
      type,
      quantity,
      unit_of_measure,
      unit_price,
      total,
      id
    ) {
      inventory_handler.updateInventory(
        item_name,
        type,
        quantity,
        unit_of_measure,
        unit_price,
        total,
        id,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_inventory_table", getInventory(socket));
            socket.broadcast.emit(
              "update_inventory_table",
              getInventory(socket)
            );
          }
        }
      );
    }
  );

  socket.on("updateQuantityInventory", function (quantity, id) {
    inventory_handler.updateInventoryQuantity(
      quantity,
      id,
      function (err, data) {
        if (err) {
          throw err;
        } else {
          socket.emit("update_inventory_table", getInventory(socket));
          socket.broadcast.emit("update_inventory_table", getInventory(socket));
        }
      }
    );
  });

  socket.on(
    "addMrs",
    function (
      mrs_number,
      request_by,
      project_id,
      department_id,
      date,
      item_number,
      description,
      quantity,
      unit,
      type
    ) {
      MRS_handler.addMrs(
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
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_mrs_table", getMRSDetailed(socket));
            socket.emit("update_mrs_table_simple", getMrs(socket));
            socket.broadcast.emit("update_mrs_table", getMRSDetailed(socket));
            socket.broadcast.emit("update_mrs_table_simple", getMrs(socket));
          }
        }
      );
    }
  );

  socket.on(
    "addIssuance",
    function (
      mrs_number,
      request_by,
      project_id,
      department_id,
      date,
      item_number,
      description,
      quantity,
      unit,
      type
    ) {
      issuance_handler.addIssuance(
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
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_issuance_table", getIssuance(socket));
            socket.broadcast.emit("update_issuance_table", getIssuance(socket));
          }
        }
      );
    }
  );

  socket.on("addPrs", function (date_request, mrs_id, project_id) {
    purchasing.getAllPurchase(function (err, data) {
      if (err) {
        throw err;
      } else {
        var lastItem = data[data.length - 1];
        var prsNum = 0;
        if (lastItem !== undefined) {
          prsNum = lastItem.PRS_NUMBER + 1;
        }
        purchasing.addPRS(
          date_request,
          prsNum,
          mrs_id,
          project_id,
          function (err, result) {
            if (err) {
              throw err;
            } else {
              socket.emit("update_prs_table", getPurchasing(socket));
              socket.broadcast.emit("update_prs_table", getPurchasing(socket));
            }
          }
        );
      }
    });
  });

  socket.on(
    "updatePrs",
    function (
      unit_price,
      total_price,
      supplier,
      status,
      date_delivered,
      pr_id
    ) {
      purchasing.updatePRS(
        unit_price,
        total_price,
        supplier,
        status,
        date_delivered,
        pr_id,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_prs_table", getPurchasing(socket));
            socket.broadcast.emit("update_prs_table", getPurchasing(socket));
          }
        }
      );
    }
  );

  socket.on("updatePrsStatus", function (status, pr_id) {
    purchasing.updatePRSStatus(status, pr_id, function (err, data) {
      if (err) {
        throw err;
      } else {
        socket.emit("update_prs_table", getPurchasing(socket));
        socket.broadcast.emit("update_prs_table", getPurchasing(socket));
      }
    });
  });

  socket.on(
    "addMrr",
    function (
      prj_id,
      mrs_id,
      quantity,
      unit_cost,
      sub_total,
      type,
      date_delivered
    ) {
      MRR_handler.addMRR(
        prj_id,
        mrs_id,
        quantity,
        unit_cost,
        sub_total,
        type,
        date_delivered,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_mrr_table", getMRR(socket));
            socket.broadcast.emit("update_mrr_table", getMRR(socket));
          }
        }
      );
    }
  );

  socket.on("addDepartment", function (dep_name, company) {
    department_handler.addDepartment(dep_name, company, function (err, data) {
      if (err) {
        throw err;
      } else {
        socket.emit("update_department_table", getDepartment(socket));
        socket.broadcast.emit("update_department_table", getDepartment(socket));
      }
    });
  });

  socket.on("addProject", function (code, project_name, start_date, end_date) {
    project_handler.addProject(
      code,
      project_name,
      start_date,
      end_date,
      function (err, data) {
        if (err) {
          throw err;
        } else {
          socket.emit("update_project_table", getProject(socket));
          socket.broadcast.emit("update_project_table", getProject(socket));
        }
      }
    );
  });

  socket.on(
    "updateProject",
    function (
      code,
      client,
      park,
      country,
      project_name,
      start_date,
      end_date,
      prj_id
    ) {
      project_handler.updateProject(
        code,
        client,
        park,
        country,
        project_name,
        start_date,
        end_date,
        prj_id,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            socket.emit("update_project_table", getProject(socket));
            socket.broadcast.emit("update_project_table", getProject(socket));
          }
        }
      );
    }
  );
});

server.listen(port);
console.log(`Listening at port ` + port);
