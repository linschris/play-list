const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
mongoose.set('useCreateIndex', true);

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json({limit: '16mb'}))
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}))
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connected!")
})

const usersRouter = require('./routes/users')
const playlistsRouter = require('./routes/playlists')
const songsRouter = require('./routes/songs')


app.use('/users', usersRouter)
app.use('/playlists', playlistsRouter)
app.use('/songs', songsRouter)

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})