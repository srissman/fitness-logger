var fitnessData = require('./fitnessData');
var User            = require('./user');
var mongoose = require('mongoose');
var exports = module.exports = {};
var foundData;


exports.validateInputs = function() {

}

exports.getData = function(id) {
	var query = fitnessData.find({ 'userId': id }).exec();
  return query;
}