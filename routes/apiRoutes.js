var db = require("../models");

module.exports = app => {
    //Gets the page to load and queries the database to get the burgers to display
    app.get(`/`, async (req, res) => {
        res.render(`index`);
    });
};