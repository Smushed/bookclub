const db = require(`../models`);

const checkDuplicateName = async (groupName) => {
    const checkedGroup = await db.Group.findOne({ name: groupName });
    return checkedGroup;
}

module.exports = {
    createGroup: async (userID, groupName, groupDescription, currentBook) => {
        //Checks if there is already a group by that name
        //If there is return a bad status code which then can be used to display data to the user
        if (!checkDuplicateName(groupName)) {
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
            }
            //Current Book
        };
        const addedGroup = await db.Group.create(newGroup);

        db.Group.update({ name: groupName }, {})

        return addedGroup;
    }
    // Invite other users to the group
}