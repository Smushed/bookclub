const LocalStrategy = require('passport-local').Strategy;
const User = require(`../models/User`); //Only requiring user here as we are only manipulating the user within passport
const zipcodes = require(`zipcodes`);


module.exports = (passport) => {

    var LocalStrategy = require(`passport-local`).Strategy;

    //Serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //DeSerialize User 
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(`local-signup`, new LocalStrategy(
        {
            usernameField: `username`,
            passwordField: `password`,
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function (req, email, password, done) {
            //First input validation checking, then onto passport signup
            //Email isn't case sensitive in passport

            let zip = ``;
            req.body.zip.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { zip += item } });

            //Checks if the zip code inputted is a valid US zip
            if (typeof zipcodes.lookup(zip) === `undefined`) {
                return done(null, false, {
                    message: `Please input a valid US zip`
                });
            };

            //TODO Check for duplicate usernames
            User.findOne({ 'local.email': email }, function (err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, { message: 'That email is already taken' });
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.email = req.body.email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.username = req.body.username;
                    newUser.local.zip = req.body.zip;
                    newUser.local.firstname = req.body.firstname;
                    newUser.local.lastname = req.body.lastname;

                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with username and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.username': username }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                };
                // if no user is found, return the message
                if (!user) {
                    return done(null, false, { message: `No user found.` }); // req.flash is the way to set flashdata using connect-flash
                };
                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, { message: `Oops! Wrong password.` }); // create the loginMessage and save it to session as flashdata
                };
                // all is well, return successful user
                return done(null, user);
            });
        }));

};