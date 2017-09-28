// app/models/fitnessData.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {type: String, required: true, unique: true},
        username     : {type: String, required: true},
        password     : String
    },
    createdAt	 : Date,
    updatedAt	 : Date,
    lastLoggedIn : Date,
    admin		 : Boolean,
    fitnessData  : {
    	age		 : Number,
    	semester : String,
    	testOne	 : String,
    	testTwo	 : Number,
    	testThree: String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

