var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        // required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    songs: [{
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
        },
        playedCount: {
            type: String,
        },
        image: {
            type: String,
        },
    }, ],
    passwordResetToken: String,
    passwordResetExpiry: Date,
}, {
    timestamps: true,
});

const user = mongoose.model("user", userSchema);
module.exports = user;