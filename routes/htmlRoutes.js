module.exports = app => {
    //Gets the page to load and queries the database to get the burgers to display
    app.get(`/`, (req, res) => {
        res.render(`index`);
    });
    app.get(`/signin`, (req, res) => {
        res.render(`signin`, { message: req.flash(`error`) });
    });

    app.get(`/signup`, (req, res) => {
        res.render(`signup`, { message: req.flash(`error`) });
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', {
            user: req.user // get the user out of session and pass to template
        });
    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
