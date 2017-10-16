// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var path 	 = require('path');
var app      = express();
require('dotenv').config();
var browserSync = require('browser-sync');
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

// you can conditionally add routes and behaviour based on environment
const isProduction = 'production' === process.env.NODE_ENV;

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
app.use(session({ secret: process.env.client_secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, listening);

function listening () {
    console.log(`Demo server available on http://localhost:${port}`);
    if(!isProduction) {
        // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
        browserSync({
            files: ['/src/**/*.scss', '/views/*.handlebars', '/dist/**/*.css'],
            online: false,
            open: true,
            port: port + 1,
            proxy: 'localhost:' + port,
            ui: false
        });
    }
}

