const User = require(`../models/User`); //Only requiring user here as we are only manipulating the user within passport
const zipcodes = require(`zipcodes`);
require(`dotenv`).config();

module.exports = (passport) => {

    const LocalStrategy = require(`passport-local`).Strategy;
    const FacebookStrategy = require(`passport-facebook`).Strategy;
    const TwitterStrategy = require('passport-twitter').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    //LOCAL SIGNUP
    passport.use(`local-signup`, new LocalStrategy(
        {
            usernameField: `email`,
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

            process.nextTick(() => {
                //TODO Check for duplicate usernames
                //TODO Throw a better error message if the email is a duplicate
                User.findOne({ 'local.email': req.body.email }, function (err, user) {
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
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with username and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function (err, user) {
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
        })
    );

    // Facebook Signin / Signup
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'emails']
    }, function (req, token, refreshToken, profile, done) {

        process.nextTick(() => {

            if (!req.user) {

                //Save if new
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    //If error connecting to the database stop everything
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user); //User is found, return that user's info
                    } else {
                        //Create a user as there was none found
                        const newUser = new User();
                        //Set all of their facebook info to the new user
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.displayname = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value;

                        //Save the new user to the database
                        newUser.save(err => {
                            if (err) {
                                throw err;
                            };

                            //If successful return the new user
                            return done(null, newUser);
                        })
                    };
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                const User = req.user; // pull the user out of the session

                // update the current users facebook credentials
                User.facebook.id = profile.id;
                User.facebook.token = token;
                User.facebook.displayname = profile.displayName;
                User.facebook.email = profile.emails[0].value;

                // save the user
                User.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }
    ));

    //Twitter Signin / Signup
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET_KEY,
        callbackURL: process.env.TWITTER_CALLBACK,
        includeEmail: true
    },
        function (token, tokenSecret, profile, done) {

            process.nextTick(() => {

                //Save if new
                User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = new User()
                        newUser.twitter.email = profile.emails[0].value;
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function (err) {
                            if (err) return done(err);
                            done(null, newUser);
                        });
                    }
                });

            });

        }));

};
