const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const socketio = require('socket.io');
const socketController = require('./util/socket');



// SETUP APP
app.set("view engine", "ejs"); //set ejs as the view engine
app.use(bodyParser.urlencoded({ extended: true })); //setup body parser so it can read url parameters
app.use(express.static(__dirname + "/public")); //setup a public folder for js and css
app.use(methodOverride("_method")); //setup means of changing POST methods to DELETE and PUT methods
app.use(flash()); //setup flash messages


//routes
// const 
// 	IndexRoutes = require("./routes/index")	  
// ;


//setup routes
app.use(require("./routes/index"));



const expressServer = app.listen(3000, () => {
// const expressServer = app.listen(process.env.PORT, process.env.IP, function(){	
    console.log("server running")
})

const io = socketio(expressServer);
socketController.checkSockets(io);