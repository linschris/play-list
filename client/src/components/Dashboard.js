import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/styles/Dashboard.css'
import PlaylistCard from './PlaylistCard';
import PopUp from 'reactjs-popup'
import CreatePlaylist from './CreatePlaylist';
import axios from "axios"
import inDevelopment from "../index"

var serverLink;
if(inDevelopment) serverLink = "http://localhost:5000/api" 
else { serverLink = "https://contraband-playlist.herokuapp.com/api" } 


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listOfPlaylistID: [],
            listOfPlaylists: [],
            base64Data: [],  
            username: null,
            password: null,
            id: null,
            playlistInput: {
                title: null,
                desc: null,
                imagePreview: null,
                image: null,
                imageType: null
            }
         }

        this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this)
        this.setImageData = this.setImageData.bind(this)

    }

    componentDidMount(props) {
        if(this.props.location.state !== undefined) {
            console.log("Info: ", this.props.location.state.userInfo)
            let userInfo = this.props.location.state.userInfo
            this.setState(prevState => ({
            ...prevState,
            username: userInfo[0],
            password: userInfo[1],
            listOfPlaylistID: userInfo[2].playlist,
            id: userInfo[2]._id
        }), function() { 
            this.getPlaylistIDs(); this.getPlaylists(); this.animateTitle();
        })} 
    }

    componentDidUpdate(props) {
        //this.getPlaylists()
    }

    animateTitle() {
        let dashboardTitle = document.getElementById("dashboard-title")
        dashboardTitle.classList.add("fade-in")
    }

    animatePlaylistCards() {
        let playlistCard = document.getElementById("playlistCard-holder")
        playlistCard.classList.add("slide-in")
    }

    getPlaylistIDs() {
        let users_url =  serverLink + "/users/" + this.state.id
        axios.get(users_url)
        .then(res => { this.setState({
            listOfPlaylistID: res.data.playlist
        }, function() {this.getPlaylists()})})
    }

    getPlaylists() {
        let currentUserPlaylists = this.state.listOfPlaylistID
        axios.post(serverLink + "/playlists/findPlaylists", { playlistArray: currentUserPlaylists })
        .then(res => {
            this.setState({
                listOfPlaylists: res.data
            })
            this.animatePlaylistCards()
        })
    }

    handlePlaylistChange = (e) => {
        const {name, value} = e.target
        const FR = new FileReader();
        const self = this;
        if(name === "image") {
            const imageFile = e.target.files[0]
            FR.addEventListener("load", function() {
                self.setImageData(imageFile, FR.result)
            })
            FR.readAsDataURL(imageFile)
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                playlistInput: {
                    ...prevState.playlistInput, [name]: value
                }
            }))
        }
    }

    setImageData = (imageFile, base64Image) => {
        this.setState(prevState => ({
            ...prevState,
            playlistInput: {
                ...prevState.playlistInput, imagePreview: URL.createObjectURL(imageFile), image: base64Image, imageType: imageFile.type
            }
        }))
    }

    handlePlaylistSubmit = (e) => {
        e.preventDefault();
        let newPlaylist = { playlistName: this.state.playlistInput.title, playlistDesc: this.state.playlistInput.desc, songs: [], image: this.state.playlistInput.image, imageType: this.state.playlistInput.imageType}
        axios.post(serverLink + "/playlists/add", newPlaylist)
        .then(res => {this.updateUserPlaylist(res.data); this.openCloseCP(); this.clearCP(); })

    }

    updateUserPlaylist(playlistID="") {
        if(playlistID === "Playlist name taken.") return;
        if(playlistID !== "") {
            this.state.listOfPlaylistID.push(playlistID)
        }
        let listOfIDs = this.state.listOfPlaylistID; let userID = this.state.id;
        axios.post(serverLink + "/users/updatePlaylist", {id: userID, playlist: listOfIDs})
            .then(res => {this.getPlaylists()})
    }


    deletePlaylist(e, index) {
        e.preventDefault();
        let playlistID = this.state.listOfPlaylistID[index]
        this.state.listOfPlaylistID.splice(index, 1)
        this.state.listOfPlaylists.splice(index, 1)
        axios.delete(serverLink + "/playlists/delete/" + playlistID)
        .then(res => { this.updateUserPlaylist() })
    }

    openCloseCP() {
        let createPlaylistElement = document.getElementById("create-playlist-wrapper")
        let dashboardTitle = document.getElementById("dashboard-title")
        if(createPlaylistElement) {
            let newSetting = (createPlaylistElement.style.display === "none" || createPlaylistElement.style.display === "") ? "block" : "none"
            createPlaylistElement.style.display = newSetting
            if(newSetting == "block") { 
                createPlaylistElement.scrollIntoView()
            }
            else {
                dashboardTitle.scrollIntoView()
            }
           
        }
    }

    clearCP() {
        var input = {...this.state.playlistInput}
        this.setState(prevState => ({
            ...prevState, 
            playlistInput: {
                ...prevState.playlistInput, title: "", desc: "", image: "", imagePreview: "", imageType: ""
            }
        }))
    }

    render() { 
        return (
            <div id="dashboard-wrapper">
                <div id="dashboard-title">
                    <span id="dashboard-subtitle">Welcome back,</span><br></br> {this.state.username}! 
                    <br></br>
                    <span id="dashboard-subtitle">Here are your playlists:</span>
                </div>
                <div id="playlistCard-holder">
                    {this.state.listOfPlaylists.map(currentPlaylist => {
                        let index = this.state.listOfPlaylists.indexOf(currentPlaylist)
                        let ID = this.state.listOfPlaylistID[index]
                        let songs = this.state.listOfPlaylists[index].songs
                        let image = this.state.listOfPlaylists[index].image
                        let newRoute = "/playlist/" + ID
                        return <Link to={{pathname: newRoute, state: {image: image}}} style={{"textDecoration": "none"}}><PlaylistCard id={ID} songs={songs} key={currentPlaylist.playlistName} title={currentPlaylist.playlistName} desc={currentPlaylist.playlistDesc} image={image} index={index} deletePlaylist={(e, index) => this.deletePlaylist(e, index)} /></Link>
                    })}
                </div>
                <button class="create-button" onClick={() => this.openCloseCP()} id="create-playlist-button">New Playlist<i id="plus" class="fa fa-plus"></i></button>
                <div id="create-playlist-wrapper"><CreatePlaylist handleChange={(e) => this.handlePlaylistChange(e)} handleSubmit={(e) => this.handlePlaylistSubmit(e)} image={this.state.playlistInput.imagePreview} title={this.state.playlistInput.title} desc={this.state.playlistInput.desc} /></div>
            </div>
          );
    }
}
 
export default Dashboard;