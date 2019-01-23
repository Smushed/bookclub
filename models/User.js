const mongoose = require(`mongoose`);
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    local: {
        firstname: {
            type: String,
            required: [true, `First name cannot be blank`]
        },
        lastname: {
            type: String
        },
        zip: {
            type: String
        },
        username: {
            type: String,
            min: [3, `Username must be 3 characters`],
            unique: true
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    return emailRegex.test(v);
                }, message: `Please input a valid email`
            },
            required: [true, `Email is required`]
        },
        password: {
            type: String,
            min: [5, `Password must be 5 characters`]
        }
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
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