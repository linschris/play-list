import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/styles/Dashboard.css'
import PlaylistCard from './PlaylistCard';
import PopUp from 'reactjs-popup'
import CreatePlaylist from './CreatePlaylist';
import axios from "axios"
import inDevelopment from "../index"


const serverLink = (inDevelopment) ? "http://localhost:5000" : "https://contraband-playlist.herokuapp.com" //change to localhost later


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
            console.log( this.state ); 
            this.getPlaylistIDs(); this.getPlaylists(); 
            this.animateElements()
        })} 
    }

    componentDidUpdate(props) {
        //this.getPlaylists()
    }

    animateElements() {
        let dashboardTitle = document.getElementById("dashboard-title")
        dashboardTitle.classList.add("fade-in")
        setTimeout(function() {
            let playlistCard = document.getElementById("playlistCard-holder")
            playlistCard.classList.add("slide-in")
        }, 250)
        
    }

    getPlaylistIDs() {
        let users_url =  serverLink + "/users/" + this.state.id
        axios.get(users_url)
        .then(res => {console.log(res); this.setState({
            listOfPlaylistID: res.data.playlist
        }, function() { console.log(this.state); this.getPlaylists()})})
    }

    getPlaylists() {
        let currentUserPlaylists = this.state.listOfPlaylistID
        console.log("CURRENT USER PLAYLISTS: ", currentUserPlaylists)
        axios.post(serverLink + "/playlists/findPlaylists", { playlistArray: currentUserPlaylists })
        .then(res => {
            console.log(res)
            this.setState({
                listOfPlaylists: res.data
            })
        })
    }

    handlePlaylistChange = (e) => {
        const {name, value} = e.target
        const FR = new FileReader();
        const self = this;
        console.log(name + " " + value)
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
        }), function() { console.log(this.state.playlistInput.imageType)})
    }

    handlePlaylistSubmit = (e) => {
        e.preventDefault();
        let newPlaylist = { playlistName: this.state.playlistInput.title, playlistDesc: this.state.playlistInput.desc, songs: [], image: this.state.playlistInput.image, imageType: this.state.playlistInput.imageType}
        axios.post(serverLink + "/playlists/add", newPlaylist)
        .then(res => {console.log(res.data); this.updateUserPlaylist(res.data); this.openCloseCP(); this.clearCP(); })

    }

    updateUserPlaylist(playlistID="") {
        if(playlistID === "Playlist name taken.") return;
        if(playlistID !== "") {
            this.state.listOfPlaylistID.push(playlistID)
        }
        let listOfIDs = this.state.listOfPlaylistID; let userID = this.state.id;
        console.log("PLAYLIST IDS: ", listOfIDs)
        axios.post(serverLink + "/users/updatePlaylist", {id: userID, playlist: listOfIDs})
            .then(res => {console.log(res); this.getPlaylists()})
    }


    deletePlaylist(e, index) {
        e.preventDefault();
        console.log(index)
        let playlistID = this.state.listOfPlaylistID[index]
        this.state.listOfPlaylistID.splice(index, 1)
        this.state.listOfPlaylists.splice(index, 1)
        axios.delete(serverLink + "/playlists/delete/" + playlistID)
        .then(res => { console.log(res); this.updateUserPlaylist() })
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
        }), () => {console.log(this.state.playlistInput)})
    }

    render() { 
        console.log(this.state.playlistInput)
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
                        let songs = this.state.listOfPlaylists[index].songs.length
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