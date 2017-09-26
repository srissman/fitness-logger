// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serialize user', user.id);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        console.log(username, password);
        console.log(req);
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err, 'finduser error');

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                console.log("Email NOT taken");
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.local.email = req.body.email;
                newUser.local.username    = req.body.name;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.createdAt = Date.now();

                console.log("saving user");
                // save the user
                newUser.save(function(err) {
                    if (err) {
                        console.log(err, newUser);
                    } else {
                        return done(null, newUser);
                    }
                });
            }

        });    

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        console.log(req.body.email);
        console.log(username);
        console.log(password);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) {
                console.log(err);
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                console.log('user not found');
                return done(null, false, req.flash('loginMessage', 'No user found. Need to Singup?, click the link below.')); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                console.log('wrong password');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            if (user) {
            // all is well, return successful user
            console.log('successful login');
            user.lastLoggedIn = Date.now();
            user.save(function(err) {
            if (err) throw err;

                console.log('User successfully updated!');
                return done(null, user);
            });
            

            }
        });
    }));

};

