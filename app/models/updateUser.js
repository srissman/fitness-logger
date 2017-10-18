var User = require('./user');
// expose this function to our app using module.exports
var exports = module.exports = {};

exports.updateUser = function(req) {  
    console.log("begin Update");
    User.findByIdAndUpdate(req.id,{$set:req}, function(err, result){
        if(err){
            console.log(err);
            return done(null, false, req.flash('updateMessage', 'Opps, something went wrong with the update'));
        }
        console.log("RESULT: " + result);
        return done(null, false, req.flash('updateMessage', 'Update Successful'));
    });
};