const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true,
        unique: false,
        trim: true, 
        minlength: 1
    },
    playlistDesc: {
        type: String,
        required: true,
        unique: false,
        trim: true, 
        minlength: 0
    },
    songs: {
        type: Array,
        required: false,
        unique: false
    },
    image: {
        type: String,
        required: false
    },
    imageType: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

playlistSchema.virtual('coverImage').get(function() {
    if(this.image != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})


const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist