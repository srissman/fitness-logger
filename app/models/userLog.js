var fitnessData = require('./fitnessData');
var User            = require('./user');
var mongoose = require('mongoose');
var exports = module.exports = {};
var foundData;


exports.validateInputs = function() {

}

exports.getData = function(id) {
	console.log('get userdata: ' + id);
	// console.log(id);
	// console.log(fitnessData);
  // User.findById(id, function (err, user) {
  //   if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("User: " + user);
  //     }  
  // } );
  var ID = id.toString();
  console.log(ID);
	fitnessData.findOne({'userId': id}, function(err, tests){
      if (err) {
        console.log('Error:');
        throw err;
      } else {
        foundData = tests;
      }
  	});
  //fix for undefinded https://stackoverflow.com/questions/35962539/express-mongoose-model-find-returns-undefined
  console.log(foundData);
  return foundData;
}