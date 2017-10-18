// app/routes.js

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        var loggedIn = req.isAuthenticated();
        if (loggedIn) {
            res.redirect('/profile');
        } else {
            res.render('./layouts/index.handlebars', {loggedIn : loggedIn}); // load the index.handlebars file
        }
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./layouts/login.handlebars', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./layouts/signup.handlebars', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        var UserLogs = require('./models/queries.js');
        var loggedIn = req.isAuthenticated();
        var testLogs = UserLogs.getData(req.user._id);
        
        testLogs.then(function(tests) {
            userTests = [];
            
            tests.forEach(function(test){
                userTests.push(test.fitnessData);
            });

            console.log(userTests);

            res.render('./layouts/profile.handlebars', {
                user : req.user, // get the user out of session and pass to template
                TestLog : userTests,
                loggedIn : loggedIn
            });
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // ADD FITNESS DATA ====================
    // =====================================

    app.get('/addtest', isLoggedIn, function(req, res) {
        var loggedIn = req.isAuthenticated();
        res.render('./layouts/tests.handlebars', {
            user : req.user, // get the user out of the session and pass to the template
            loggedIn : loggedIn
        })
    })

    app.post('/addtest', isLoggedIn, function(req, res) {
        var addtest  = require('./models/addTest.js');
        addtest.addInformation(req.body);
        res.render('./layouts/tests.handlebars', {
            user : req.user // get the user out of the session and pass to the template
        })
    })


    // =====================================
    // ADMIN ====================
    // =====================================
    app.get('/admin', isLoggedIn, isAdmin, function(req, res) {
        var loggedIn = req.isAuthenticated();
        var userLogs = require('./models/queries.js');
        
        var allLogs = userLogs.getAllData();
        
        allLogs.then(function(logs) {
            userTests = [];
            
            logs.forEach(function(log){
                userTests.push(log);
            });

            console.log(userTests);

            res.render('./layouts/admin.handlebars', {
                user : req.user, // get the user out of session and pass to template
                TestLog : userTests,
                loggedIn : loggedIn
            });
        });
    })

    // =====================================
    // UPDATE PERSONAL DETAILS ====================
    // =====================================

    app.get('/updateDetails', isLoggedIn, function(req, res) {
        var loggedIn = req.isAuthenticated();
        res.render('./layouts/updateDetails.handlebars', {
            user : req.user, // get the user out of the session and pass to the template
            loggedIn : loggedIn
        })
    })

    app.post('/update', isLoggedIn, function(req, res) {
        console.log("Update function");
        var update  = require('./models/updateUser.js');
        update.updateUser(req.body);
        console.log("Update Finished");
        res.render('./layouts/updateDetails.handlebars', {
            user : req.user // get the user out of the session and pass to the template
        })
    })

    // =====================================
    // RESET PASSWORD ====================
    // =====================================

    app.get('/resetPassword', isLoggedIn, function(req, res) {
        var loggedIn = req.isAuthenticated();
        res.render('./layouts/resetPassword.handlebars', {
            user : req.user, // get the user out of the session and pass to the template
            loggedIn : loggedIn
        })
    })

    // app.post('/addtest', isLoggedIn, function(req, res) {
    //     var addtest  = require('./models/addTest.js');
    //     addtest.addInformation(req.body);
    //     res.render('./layouts/tests.handlebars', {
    //         user : req.user // get the user out of the session and pass to the template
    //     })
    // })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isAdmin(req, res, next) {
    console.log('checking admin.....');
    var userCheck = require('./models/queries.js');
    // if user is authenticated in the session, carry on 
    var adminCheck = userCheck.isAdmin(req.user._id);

     adminCheck.then(function(admin) {

        if (admin.admin) {
            console.log('is admin');
            return next();
        } else {
            console.log('Not Admin');
            res.redirect('/profile');
        }
    });
}
