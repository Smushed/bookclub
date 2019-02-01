const userHandler = require(`../handlers/userHandler`);

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

    app.get(`/profile`, userHandler.isLoggedIn, function (req, res) {
        res.render(`profile`, {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get(`/userlist`, async (req, res) => {
        const userlist = await userHandler.getUserList();
        res.render(`allusers`, { userlist });
    });

    app.get(`/userlistjson`, async (req, res) => {
        const userlist = await userHandler.getUserList();
        res.json(userlist);
    });

};
