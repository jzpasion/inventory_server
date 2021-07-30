var http = require("http");
var port = process.env.PORT || 6969;
var app = require('./app');
var socketIO = require('socket.io')(server, { origins: '*:*'});
var inventoryHandler = require("./api/handler/inventory_handler");


var server = http.createServer(app);


const getAllInventory = async socket =>{
    try{
        const res = await inventoryHandler.getAllInventory(function(data){
            return data;
        });
        console.log(res.data);
        socket.emit("getAllInventory",res.data);
        socket.broadcast.emit("getAllInventory" , res.data);
    }catch(error){
        console.log(error);
    }
}


socketIO.on('connection', socket => {
    console.log("User connected");
  })


server.listen(port);
console.log(`Listening at port ` + port);