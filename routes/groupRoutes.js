const userHandler = require(`../handlers/userHandler`);
const groupHandler = require(`../handlers/groupHandler`);

module.exports = app => {
    //User adds a new group, fills out a form on the book name & description
    //Then adds the current book they're reading
    //THEN hits this route to complete the group
    app.post(`/api/creategroup`, userHandler.isLoggedIn, async (req, res) => {
        const { groupName, groupDescription, currentBook } = req.body;
        //If 500 is returned a group with that name already exists
        //Else it returns the new group
        const response = await groupHandler.createGroup(req.user._id, groupName, groupDescription, currentBook);
        res.json(response);

    });

    app.put(`/api/adduser`, userHandler.isLoggedIn, async (req, res) => {
        const group = await groupHandler.checkGroupMod(req.user._id, req.body.groupID);
        res.json(group);
    });
}