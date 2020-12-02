require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const socketio = require('socket.io');
// const mongoose = require("mongoose");
const LocalStrategy = require("passport-local");
const passport = require("passport");

//UTILS
const socketUtil = require('./util/socket');
const databaseUtil = require('./util/database');
const seedsUtil = require('./util/seeds');

//MODELS
const User = require("./models/user");


// SETUP APP
app.set("view engine", "ejs"); //set ejs as the view engine
app.use(bodyParser.urlencoded({ extended: true })); //setup body parser so it can read url parameters
app.use(express.static(__dirname + "/public")); //setup a public folder for js and css
app.use(methodOverride("_method")); //setup means of changing POST methods to DELETE and PUT methods
app.use(flash()); //setup flash messages


//SETUP SESSIONS
app.use(require("express-session")({
    secret: process.env.SESSION_SECRET, //used to encode and decode sessions
    resave: false,
    saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());


//SETUP THE LOCAL VARIABLES
app.use(function(req, res, next){
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");	
	next();
})


//setup user authentication and password serialization and deserialization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SETUP ROUTES
app.use(require("./routes/index"));

seedsUtil.seedDB();

const expressServer = app.listen(3000, () => {
// const expressServer = app.listen(process.env.PORT, process.env.IP, function(){	
    console.log("server running")
})


const io = socketio(expressServer);
socketUtil.checkSockets(io);