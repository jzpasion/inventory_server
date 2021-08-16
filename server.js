const inventory_handler = require('./api/handler/inventory_handler');
const department_handler = require('./api/handler/department_handler');
const project_handler = require('./api/handler/project_handler')
const MRS_handler = require('./api/handler/mrs_handler')
const user_handler = require('./api/handler/user_handler')
const purchasing = require('./api/handler/purchasing_handler')
const http = require("http");
const port = process.env.PORT || 8081;
const app = require('./app');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

const getInventory = async socket => {
    inventory_handler.getAllInventory(function (err, data) {
        if (err) {
            return err
        } else {
            //console.log(data);
            socket.emit("getInventories", data);
            socket.broadcast.emit("getInventories", data);
        }
    })
}

const getDepartment = async socket =>{
    department_handler.getAllDepartment(function(err , data){
        if(err){
            return err
        }else{
            socket.emit("getDepartments", data);
            socket.broadcast.emit("getDepartments", data);
        }
    })
}

const getProject = async socket =>{
    project_handler.getAllProject(function(err , data){
        if(err){
            return err
        }else{
            socket.emit("getProjects", data);
            socket.broadcast.emit("getProjects", data);
        }
    })
}

const getMrs = async socket =>{
    MRS_handler.getAllMrs(function(err , data){
        if(err){
            return err
        }else{
            socket.emit("getMRS" , data)
            socket.broadcast.emit("getMRS", data);
        }
    })
}

const getPurchasing = async socket =>{
    purchasing.getAllPurchase(function(err,data){
        if(err){
            return err
        }else{
            socket.emit("getPurchasing" ,data)
            socket.broadcast.emit("getPurchasing" , data)
        }
    })
}
io.on('connection', socket => {
    console.log('user connected');
    getInventory(socket);
    getDepartment(socket);
    getProject(socket);
    getMrs(socket);
    getPurchasing(socket);
    
    socket.on("getInventory", () => {
        getInventory(socket)
    })

    socket.on("getDepartment" , () =>{
        getDepartment(socket)
    })

    socket.on("getProject" , () =>{
        getProject(socket);
    })

    socket.on("getMRSS", ()=>{
        getMrs(socket);
    })

    socket.on("getAllPurchasing" , ()=>{
        getPurchasing(socket);
    })



    socket.on("getUser" ,function( uname, pword,callback){
        user_handler.getUser(uname , pword ,function(err,data){
            if(err){
                callback(
                    err
                )
            }else{
                callback(   
                   data
                )
           
            }
        })
    })

    socket.on("addInven", function(item_name, type, quantity, unit_of_measure, unit_price, total , callback){
        inventory_handler.addInventory(item_name, type, quantity, unit_of_measure, unit_price, total, function (err, data) {
            if (err) {
                return err
            } else {
              //  console.log(data);
            }
        })
        callback({
            status: "ok"
          });
        socket.emit("update_inventory_table", getInventory(socket));
        socket.broadcast.emit("update_inventory_table", getInventory(socket));   
    })
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });

    socket.on("addMrs" , function(mrs_number , request_by,project_id , department_id  , date , item_number , description , quantity , unit ,callback){
        MRS_handler.addMrs( mrs_number , request_by ,project_id , department_id  , date , item_number , description , quantity , unit , function(err,data){
            if(err){
               return err
            }else{
              console.log(data);
            }
            callback({
                status: "ok"
              });
            socket.emit("update_mrs_table", getMrs(socket));
            socket.broadcast.emit("update_mrs_table", getMrs(socket));
        })
    })

    socket.on("addPrs" , function(date_request , prs_number , mrs_id, project_id ){
        purchasing.addPRS(date_request , prs_number , mrs_id, project_id,function(err,result){
            if(err){
                return err
            }else{
                console.log(result);
            }
        })
    })
})


server.listen(port);
console.log(`Listening at port ` + port);