const router = require('express').Router()
const Playlist = require('../models/playlist.model')
const { move } = require('./songs')

const imageTypes = ['image/jpeg', 'image/png', 'image/gif']

router.route('/').get((req, res) => {

})

router.route('/:id').get((req, res) => {
    let playlistID = req.params.id
    Playlist.findOne({_id: playlistID}, function(err, playlist) {
        if(err) console.log("ERR: ", err)
        res.json(playlist)
    })    

})

router.route('/getImage/:id').get((req, res) => {
    let playlistID = req.params.id
    Playlist.findOne({_id: playlistID}, function(err, playlist) {
        if(err) console.log("ERR: ", err)
        res.json(playlist.image)
    })    

})


router.route('/findPlaylists').post((req, res) => {
    console.log(req.body)
    let playlistIDArray = req.body.playlistArray
    console.log("PLAYLIST ID ARRAY: ", playlistIDArray)
    Playlist.find({_id: { $in: playlistIDArray}}, function(err, results) {
        if(results) { res.json(results) }
        else { res.json(err)}
    })
})


router.route('/updatePlaylist').post((req, res) => {
    let newInfo = req.body.info
    console.log(newInfo)
    Playlist.update( {_id: req.body.id }, {playlistName: newInfo.title, playlistDesc: newInfo.desc, songs: newInfo.songs, image: newInfo.image, imageType: newInfo.imageType})
    .then(song => { res.json(song); console.log("NEW PLAYLIST: ", song) })
})



router.route('/updatePlaylistSongs').post((req, res) => {
    let newSongs = req.body.newSongs
    console.log("NEW PLAYLIST", newSongs)
    Playlist.update( {_id: req.body.id }, { songs: newSongs })
    .then(playlist => { res.json(playlist); console.log("NEW PLAYLIST: ", playlist) })
})


router.route('/add').post((req, res) => {
    const { playlistName, playlistDesc, songs, image, imageType} = req.body;
    const newPlaylist = new Playlist({playlistName: playlistName, playlistDesc: playlistDesc, songs: songs, image: image, imageType: imageType})
    Playlist.findOne({playlistName: playlistName}, function(err, user) {
        if(user == null) { 
            newPlaylist.save()
                .then((playlist) => res.json(playlist._id))
                .catch(err => res.json('Error: ' + err))
        }
        else {
            res.json("Playlist name taken.")
        }
    })
    
})
router.route('/add').post((req, res) => {
    const { playlistName, playlistDesc, songs, image, imageType} = req.body;
    const newPlaylist = new Playlist({playlistName: playlistName, playlistDesc: playlistDesc, songs: songs, image: image, imageType: imageType})
    Playlist.findOne({playlistName: playlistName}, function(err, user) {
        if(user == null) { 
            newPlaylist.save()
                .then((playlist) => res.json(playlist._id))
                .catch(err => res.json('Error: ' + err))
        }
        else {
            res.json("Playlist name taken.")
        }
    })
    
})

router.route('/delete/:id').delete((req, res) => {
    console.log(req.params.id)
    Playlist.deleteOne({_id: req.params.id})
    .then(song => res.json(song))
    .catch(err => res.json(err))
    
})


module.exports = router;