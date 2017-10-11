var fitnessData 	= require('./fitnessData');
var User            = require('./user');
var mongoose 		= require('mongoose');
var exports 		= module.exports = {};

exports.isAdmin = function(id) {
	var query = User.findOne({'_id': id}).exec();
	return query;
}

exports.getData = function(id) {
	var query = fitnessData.find({ 'userId': id }).exec();
  return query;
}

exports.getAllData = function(id) {
	var query = fitnessData.find().exec();
  return query;
}