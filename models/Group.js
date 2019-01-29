const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

//Everything is to be singular
const GroupSchema = new Schema({
    groupInfo: {
        name: String,
        description: String
    },
    userlist: [
        {
            _id: String,
            isAdmin: Boolean,
            isBlocked: Boolean
        }
    ],
    currentBook: [
        {
            title: String,
            author: String,
            pages: Number,
            description: String,
            dateFinished: Date
        }
    ],
    pastBooks: {}
});


module.exports = mongoose.model(`Group`, GroupSchema);