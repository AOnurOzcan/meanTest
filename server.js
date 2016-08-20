// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var passport = require('passport');
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var session      = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');

require('./config/passport')(passport); // pass passport for configuration
// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// required for passport
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize({}));
app.use(passport.session({})); // persistent login sessions
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users

// routes ======================================================================
require('./app/routes.js')(app, passport);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
