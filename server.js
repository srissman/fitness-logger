// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var path 	 = require('path');
var app      = express();
require('dotenv').config();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var sassMiddle = require('node-sass-middleware');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var exphbs  = require('express-handlebars');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {
	useMongoClient: true
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// setup for sas compile
app.use(sassMiddle({
	src: path.join(__dirname, 'src/sass'),
    dest: path.join(__dirname, 'dist/css/'),
	debug: true,
	force: true,
	prefix: '/css',
outputStyle: 'compressed'
}));

// set path for relative files
app.use(express.static(path.join(__dirname, 'src')));

//set templating engine
app.engine('handlebars', exphbs({defaultLayout: 'template'}));
app.set('view engine', 'handlebars');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

