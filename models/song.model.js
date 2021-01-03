const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
    songName: {
        type: String,
        required: true,
        unique: false,
        trim: true, 
        minlength: 1
    },
    songDesc: {
        type: String,
        required: true,
        unique: false,
        trim: true,

    },
    songLink: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true
})


const Song = mongoose.model('Song', songSchema)

module.exports = Song