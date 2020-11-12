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
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required:true,
        },
        emotion: {
            type: String,
        },
        src: {
            type: String,
            required:true,
        },
        img: {
            type:String,
            required:true,
            
        }
    }, ],
    passwordResetToken: String,
    passwordResetExpiry: Date,
}, {
    timestamps: true,
});

const user = mongoose.model("user", userSchema);
module.exports = user;