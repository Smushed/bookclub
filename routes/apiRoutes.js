var db = require("../models");
const userHandler = require(`../handlers/userHandler`);

module.exports = app => {
    //Gets the page to load and queries the database to get the burgers to display
    app.post(`/api/searchbook`, async (req, res) => {
        console.log(req.body);
    });

    app.put(`/api/updateuser`, async (req, res) => {
        res.json(req.body)
        switch (req.body.request) {
            case `firstname`:
                userHandler.updateFirstName(req.body.userID, req.body.firstname)
                break;
            case `lastname`:
                break;
            case `zip`:
                break;
            case `email`:
                break;
        }
    })
};