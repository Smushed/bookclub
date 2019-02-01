const db = require(`../models`);

module.exports = {
    createGroup: async (userID, groupName, groupDescription, currentBook) => {
        //Group name
        //Description
        //Current Book
        //TODO write group DB test here
        const newGroup = {};
        newGroup.groupInfo = {};
        newGroup.groupInfo.name = groupName;
        newGroup.groupInfo.description = groupDescription;
        newGroup.currentBook = currentBook;
        const addedGroup = await db.Group.create(newGroup);
        //Push creator onto the userlist array
        //Make them a moderator

        return addedGroup;


    }
    // Invite other users to the group
}