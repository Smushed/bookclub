var db = require("../models");
const userHandler = require(`../handlers/userHandler`);

module.exports = app => {
    app.post(`/api/searchbook`, async (req, res) => {
        console.log(req.body);
    });

    app.put(`/api/updateuser`, async (req, res) => {
        //Pass the user to change's field, their updated value and what field they would like to change
        const result = await userHandler.updateProfile(req.body.userID, req.body.value, req.body.request);
    });
};