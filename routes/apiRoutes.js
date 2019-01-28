var db = require("../models");
const userHandler = require(`../handlers/userHandler`);

module.exports = app => {
    app.post(`/api/searchbook`, async (req, res) => {
        console.log(req.body);
    });

    app.put(`/api/updateuser`, async (req, res) => {
        let result;
        //Switch statement here to decide on what the user is updating
        //They can only update one part of their profile at a time
        switch (req.body.request) {
            case `username`:
                result = await userHandler.updateUsername(req.body.userID, req.body.value);
                break;
            case `firstname`:
                result = await userHandler.updateFirstName(req.body.userID, req.body.value);
                //TODO Add something to refresh the page
                break;
            case `lastname`:
                result = await userHandler.updateLastName(req.body.userID, req.body.value)
                break;
            case `zip`:
                result = await userHandler.updateZip(req.body.userID, req.body.value);
                break;
            case `email`:
                result = await userHandler.updateEmail(req.body.userID, req.body.value);
                break;
        }
    })
};