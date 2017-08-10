var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyparser.urlencoded({extend: true}))
router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodes and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}))


// Build the REST operations at the base for userNames
//this will be accessible from http://localhost:3000/userNames if the defualt route for / is left unchanged
router.route('/')
	// GET all usernames
	.get((req, res, next) => {
		//retrieve all undernames from mongodb
		mongoose.model('userNames').find({}, function (err, userNames) {
			if (err) {
				return console.error(err);
			} else {
				//respond to both HTML and JSON. JSON responses requore 'Accept: application/json;' in the request header
				res.format({
					html: function() {
						res.render('userNames/index', {
							title: 'All my usernames',
							"userNames" : userNames
						});
					},
					//JSON response will show all the usernames in JSON format
					json : function(){
						res.json(userNames);
					}
				});
			}
		})
	});

	//POST a new UserName
	.post(function(req, res) {
		//Get values from POST request. These can be done through forms or REST calls. They rely on the "name" attributes from forms
		var userName = req.body.userName;
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var email = req.body.email;

		//Call the create function for our database
		mongoose.model('userName').create({
			userName : userName,
			firstName : firstName,
			lastName : lastName,
			email : email
		}, function (err, userName) {
			if (err) {
				res.send("There was a problem adding the user to the database");
			} else {
				//Username created
				console.log('POST creating new user: ' + userName);
				//HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
				res.format({
					html: function() {
						// If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("userNames");
                        // And forward to success page
                        res.redirect("/userNames");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(blob);
                    }
				});
			}
		})
	});