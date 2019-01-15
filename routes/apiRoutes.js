var db = require("../models");

module.exports = app => {
    //Gets the page to load and queries the database to get the burgers to display
    app.post(`/api/searchbook`, async (req, res) => {
        console.log(req.body);
    });
};