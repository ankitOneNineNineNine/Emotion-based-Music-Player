var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({

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
    emotion: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },


}, {
    timestamps: true,
});

const user = mongoose.model("song", songSchema);
module.exports = user;