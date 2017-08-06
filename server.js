const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

//Mongodb Client
MongoClient.connect('mongodb://sam_rissman:5c4reCr0w@ds059135.mlab.com:59135/fitnessloggerdb', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
})

//setup Nunjucks
var PATH_TO_TEMPLATES = '.' ;
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});

// Setup Body parser for use within express
// Make sure you place body-parser before your CRUD handlers
app.use(bodyParser.urlencoded({extended: true}));


// READ
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

app.get('/home', (req, res) => {
	// do something
	db.collection('names').find().toArray(function(err, results) {
		console.log(results);
		return res.render( 'home.html', results );
	})
})

// CREATE
app.post('/names', (req, res) => {
	db.collection('names').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to names DB')
		res.redirect('/')
	})
})