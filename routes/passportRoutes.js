//This file is for the post routes to hold the passport login and signin functionality
module.exports = function (app, passport) {

    app.get(`/signout`, function (req, res) {
        req.logout();
        res.redirect(`/`);
    });

    //Local Signin / Signup
    app.post(`/signin`, passport.authenticate(`local-signin`, {
        successRedirect: `/`,
        failureRedirect: `/signin`,
        failureFlash: true
    }));

    app.post(`/signup`, passport.authenticate(`local-signup`, {
        successRedirect: `/`,
        failureRedirect: `/signup`,
        failureFlash: true
    }
    ));

    //Stopped at "Showing Our User index"
    //https://scotch.io/tutorials/easy-node-authentication-facebook

    //Facebook
    app.get(`/auth/facebook`, passport.authenticate(`facebook`, {
        scope: [`public-profile`, `email`]
    }));
    app.get(`/auth/facebook/callback`, passport.authenticate(`facebook`, {
        successRedirect: `/`,
        failureRedirect: `/signin`
    }));


    //Twitter
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope: ['include_email=true']
    }));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
};