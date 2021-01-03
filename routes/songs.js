const router = require('express').Router()
const Song = require('../models/song.model')

router.route('/').get((req, res) => {

})

router.route('/:id').get((req, res) => {
    let songID = req.params.id
    Song.findOne({_id: songID}, function(err, song) {
        if(err) console.log("ERR: ", err)
        res.json(song)
    })    

})

router.route('/findSongs').post((req, res) => {
    console.log(req.body)
    let songIDArray = req.body.songArray
    console.log("SONG ID ARRAY: ", songIDArray)
    Song.find({_id: { $in: songIDArray}}, function(err, results) {
        if(results) { res.json(results) }
        else { res.json(err)}
    })
})


router.route('/add').post((req, res) => {
    const songName = req.body.title
    const songDesc = req.body.desc
    const songLink = req.body.link

    const newSong = new Song({ songName, songDesc, songLink })
    newSong.save()
        .then((song) => res.json(song._id))
        .catch(err => res.status(400).json('Error: ' + err))

    // Song.findOne({songName: songName}, function(err, user) {
    //     if(user == null) { 
    //         newSong.save()
    //             .then(() => res.json("Song added!"))
    //             .catch(err => res.status(400).json('Error: ' + err))
    //     }
    //     else {
    //         res.json("Song name taken.")
    //     }
    // })
})

router.route('/updateSong').post((req, res) => {
    let newInfo = req.body.info
    Song.update( {_id: req.body.id }, { songName: newInfo.title, songLink: newInfo.link, songDesc: newInfo.desc })
    .then(song => { res.json(song); console.log("NEW PLAYLIST: ", song) })
})

router.route('/deleteSong/:id').delete((req, res) => {
    Song.deleteOne({_id: req.params.id })
    .then(song => {res.json(song); console.log("deleted: ", song)})
})

module.exports = router;