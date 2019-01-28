const db = require(`../models`);

//This is for updating the user profile once created
//The user only has access to the local profile
module.exports = {
    getUserList: async () => {
        const userlist = await db.User.find({});
        return userlist;
    }, //Can I refactor everything below into one function??
    updateUsername: (userID, username) => {
        //TODO Check for duplicates
        db.User.updateOne({ _id: userID }, { $set: { 'local.username': username } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "Username Updated Successfully"
            }
        });
    },
    updateFirstName: (userID, firstname) => {
        db.User.updateOne({ _id: userID }, { $set: { 'local.firstname': firstname } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "First Name Updated Successfully"
            }
        });
    },
    updateLastName: (userID, lastname) => {
        db.User.updateOne({ _id: userID }, { $set: { 'local.lastname': lastname } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "Last Name Updated Successfully"
            }
        });
    },
    updateZip: (userID, zip) => {
        db.User.updateOne({ _id: userID }, { $set: { 'local.zip': zip } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "Last Name Updated Successfully"
            }
        });
    },
    updateEmail: (userID, email) => {
        db.User.updateOne({ _id: userID }, { $set: { 'local.email': email } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "Email Updated Successfully"
            }
        });
    }
}