const mongoose = require(`mongoose`);
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    local: {
        firstname: {
            type: String,
        },
        lastname: String,
        zip: String,
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String
        }
    },
    facebook: {
        id: String,
        token: String,
        displayname: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        email: String
    },

});

//Methods for validation
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model(`User`, UserSchema);