var fitnessData = require('./fitnessData');
var User            = require('./user');
// expose this function to our app using module.exports
var exports = module.exports = {};

exports.validateInputs = function() {

}

exports.addInformation = function(information, req) {
	console.log(information);
	User.findById(information.id, function(err, data) {
            if (err) {
            	return done(null, false, req.flash('loginMessage', 'Oops! Looks like something has gone wrong'));
            }

            if (data) {
            console.log(data);
                var date = new Date();
            	var newData = new fitnessData();

            	newData.userId = information.id;
                newData.name = information.name;
            	newData.createdOn = Date.now();
            	newData.fitnessData.term = information.term + ' ' + date.getFullYear();
            	newData.fitnessData.testOne = information.test1;
            	newData.fitnessData.testTwo = information.test2;
            	newData.fitnessData.testThree = information.test3;
            	
            	console.log("saving data");
                // save the user
                newData.save(function(err) {
                    if (err) {
                        console.log(err, newData);
                    } else {
                        return;
                    }
                });
            }
        });
}