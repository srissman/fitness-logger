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
var PATH_TO_TEMPLATES = './views' ;
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});

// Setup Body parser for use within express
// Make sure you place body-parser before your CRUD handlers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//for update functions
app.use(express.static('public'))

// READ
app.get('/', (req, res) => {
	//display the index.html form page
	res.render( 'index.html');
})

app.get('/home', (req, res) => {
	// Get the collection of names from the mongo db and display them using a nunjucks template
	db.collection('names').find().toArray(function(err, results) {
		if (err) return console.log(err);

		return res.render( 'home.html', {names: results} );
	})
})

app.get('/update', (req, res) => {
	//display the index.html form page
	res.render( 'update.html');
})

// CREATE
app.post('/names', (req, res) => {
	db.collection('names').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to names DB')
		res.redirect('/home')
	})
})

// UPDATE
app.put('/names', (req, res) => {
  // Handle put request

  db.collection('names')
  .findOneAndUpdate({firstName: req.body.oldFirstName}, {
    $set: {
      firstName: req.body.newFirstName,
      lastName: req.body.newLastName
    }
  }, {
    sort: {_id: -1}, //Sort from last most recent input
    upsert: true // If nothing exists upsert information
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
