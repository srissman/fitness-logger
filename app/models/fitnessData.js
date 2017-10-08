// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

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

exports.getAllTasks = function(callback){
        Task.find().exec(function (err, docs) {

        // If there is an error, return the error and no results
        if(err) return callback(err, null)

       // No error, return the docs
        callback(null, docs)
    });
}

// create the model for fitnessData and expose it to our app
module.exports = mongoose.model('FitnessData', fitnessDataSchema, 'fitnessdata');

