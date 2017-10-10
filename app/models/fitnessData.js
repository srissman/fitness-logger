// app/models/user.js
// load the things we need
var mongoose = require('mongoose').set('debug', true);;

// define the schema for our user model
var fitnessDataSchema = mongoose.Schema({
    userId     : String,
    fitnessData  : {
    	semester : String,
    	testOne	 : String,
    	testTwo	 : Number,
    	testThree: String,
    },
    createdOn     : Date

});

// methods ======================

exports.getOneData = function(id) {
    var query = fitnessData.findOne({ 'userId': id }).exec();
  return query;
}

exports.getAllUserData = function(id) {
    var query = fitnessData.find({ 'userId': id }).exec();
  return query;
}

exports.getAllData = function(id) {
    var query = fitnessData.find().exec();
  return query;
}

// create the model for fitnessData and expose it to our app
module.exports = mongoose.model('FitnessData', fitnessDataSchema, 'fitnessdata');

