const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require("passport")
const session = require("express-session")
const LocalStrategy = require("passport-local-mongoose")
const logger = require("morgan")
const cookieParser = require('cookie-parser');
const models = require("./models")
const routes= require("./routes");
const path = require("path");
var db = require("./models")



// const io = require("socket.io")
// Configure body parser for AJAX requests
// const AWS = require("aws-sdk");
// const fileUpload = require("express-fileupload");
// const routes = require("./routes");
// Serve up static assets
// app.use(express.static("client/build"));
// Add routes, both API and view



app.use(cookieParser());
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}))
// app.use(fileUpload());
// Serve up static assets

if (process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname,"client/build")));
}

// Add routes, both API and view

app.use(logger("dev"));


app.use(passport.session()); // persistent login sessions
//load passport strategies
//require('./config/passport/passport.js')(passport);



app.use(function (req, res, next){
	//if user exists we will access it from anywhere if not we get null. 
	res.locals.user = req.user || null; 
	next();
});

// io.on('connection', function (client) {
//     client.on('register', handleRegister)
  
//     client.on('join', handleJoin)
  
//     client.on('leave', handleLeave)
  
//     client.on('message', handleMessage)
  
//     client.on('chatrooms', handleGetChatrooms)
  
//     client.on('availableUsers', handleGetAvailableUsers)
  
//     client.on('disconnect', function () {
//       console.log('client disconnect...', client.id)
//       handleDisconnect()
//     })
  
//     client.on('error', function (err) {
//       console.log('received error from client:', client.id)
//       console.log(err)
//     })
//   })
// //

app.use(routes);
// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/progressiondb"
);

// require("./routes/html-routes.js")(app,passport);
//require("./routes/index.js")(app,passport);

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});