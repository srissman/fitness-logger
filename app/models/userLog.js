var fitnessData = require('./fitnessData');
var User            = require('./user');
var mongoose = require('mongoose');

var exports = module.exports = {};

exports.validateInputs = function() {

}

exports.getData = function(id) {
	// console.log('get userdata');
	// console.log(id);
	// console.log(fitnessData);
	fitnessData.find(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
      }
  	});
}