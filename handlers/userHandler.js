const db = require(`../models`);

module.exports = {
    getUserList: async () => {
        const userlist = await db.User.find({});
        return userlist;
    },
    updateFirstName: async (userID, firstname) => {
        const user = await db.User.findOne({ _id: userID });
        console.log(user)
        const resolved = await user.updateOne({ _id: userID }, { $set: { 'local.firstname': firstname } });

        await console.log(resolved)
    }
}