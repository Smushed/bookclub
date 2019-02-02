const db = require(`../models`);

const checkDuplicateName = groupName => {
    const checkedGroup = db.Group.findOne({ name: groupName });
    return checkedGroup
}

module.exports = {
    createGroup: async (userID, groupName, groupDescription, currentBook) => {
        //Checks if there is already a group by that name
        //If there is return a bad status code which then can be used to display data to the user
        if (await checkDuplicateName(groupName)) {
            return 500;
        }
        const newGroup = {
            name: groupName,
            description: groupDescription,
            userlist: {
                _id: userID,
                isAdmin: true,
                isMod: true,
                isBanned: false
            },
            currentBook
        };
        const addedGroup = await db.Group.create(newGroup);

        db.Group.update({ name: groupName }, {})

        return addedGroup;
    },
    // Invite other users to the group
    addUser: async (groupID, addedUserID) => {
        //get the user ID, add them to the array userlist within the group
        const updatedGroup = await db.Group.update({ _id: groupID }, { $push: { userlist: addedUserID } })
        return updatedGroup;
    },
    checkGroupMod: async (userID, groupID) => {

        //Looks up the group in the database
        const foundGroup = await db.Group.findOne({ _id: groupID });

        //Finds the current user
        const currentUser = await foundGroup.userlist.find(users => users._id == userID);

        //Checks if that user is a mod and returns a boolean
        const isModerator = (currentUser.isMod ? true : false)

        return isModerator;
    }
}