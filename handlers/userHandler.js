const db = require(`../models`);

module.exports = {
    getUserList: async () => {
        const userlist = await db.User.find({});
        return userlist;
    }
}