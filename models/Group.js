const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

//Everything is to be singular
const GroupSchema = new Schema({
    groupInfo: {
        name: {
            type: String,
            unique: true
        },
        description: String
    },
    userlist: [
        {
            _id: String,
            isAdmin: Boolean,
            isCreator: Boolean,
            isBanned: Boolean
        }
    ],
    currentBook: {
        title: String,
        author: String,
        pages: Number,
        description: String
    },
    // Everything is singular
    //Array of books that this group has read in the past
    pastBook: [
        {
            title: String,
            author: String,
            pages: Number,
            description: String,
            dateFinished: Date
        }
    ]
});


module.exports = mongoose.model(`Group`, GroupSchema);