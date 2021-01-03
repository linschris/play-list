const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})





router.route('/add').post((req, res) => {
    const username = req.body.username
    const password = req.body.password
    let newList = []
    const newUser = new User({username, password, newList})
    User.findOne({username: username}, function(err, user) {
        if(user == null) { 
            newUser.save()
                .then(() => res.json("User added!"))
                .catch(err => res.status(400).json('Error: ' + err))
        }
        else {
            res.json("Username taken.")
        }
    })  
})

router.route('/updatePlaylist').post((req, res) => {
    let newPlaylist = req.body.playlist;
    console.log("NEW PLAYLIST", newPlaylist)
    console.log("NEW ID", req.body.id)
    User.update( {_id: req.body.id }, {playlist: newPlaylist})
    .then(user => { res.json(user); console.log(user) })
})



router.route('/login').post((req, res) => {
    let user = req.body;
    console.log(user.username + " " + user.password)
    User.findOne({ username: req.body.username, password: req.body.password }, function(err, user) {
        if(user == null) { res.json(null)}
        else {
            res.json(user)
        }
    })
})




router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    User.findById(req.params.id, function(err, user) {
        res.json(user)
    })
})


router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted!"))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;