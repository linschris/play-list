import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import PopUp from 'reactjs-popup'
import axios from "axios"
import VideoCard from "./VideoCard";
import CreateSong from "./CreateSong";
import getAverageRGB from "./getAverageRGB"
 

const serverLink = "https://contraband-playlist.herokuapp.com" //change to localhost later


const Playlist = () => {
    const [playlistName, setPlaylistName] = useState(null)
    const [playlistDesc, setPlaylistDesc] = useState(null)
    const [songArray, setSongArray] = useState([])
    const [songArrayInfo, setSongArrayInfo] = useState([])
    const [newSongInfo, setNewSongInfo] = useState(null)
    const [songInfo, setSongInfo] = useState({title: null, desc: null, link: null})
    const [image, setImage] = useState(null)
    const [dominantColor, setDominantColor] = useState(null)

    
    let { id } = useParams();
    useEffect(() => {
        console.log(songArray)
        console.log(songArrayInfo)
    })

    useEffect(() => {
        fetchData(id)
        
    }, [id])
    useEffect(() => {
        getDominantColor()
        
    }, [image])

    useEffect(() => {
        updatePlaylists()
    }, [songArray])

    //open/close create song panel
    function openCloseCS() {
        let createSongPanel = document.getElementById("create-song-wrapper")
        let createButton = document.getElementById("create-song-button")
        let playlistImage = document.getElementById("playlist-wrapper")
        console.log(createSongPanel.style.display)
        if(createSongPanel) {
            let newSetting = createSongPanel.style.display == "none" ? "block" : "none"
            createSongPanel.style.display = newSetting
            if(newSetting == "block") { 
                createButton.scrollIntoView()
            }
            else {
                playlistImage.scrollIntoView()
            }
            
        } 
    }
    
    function handleSongChange(e) {
        const {name, value} = e.target
        setSongInfo({
            ...songInfo, [name]: value
        })
    }

    function clearSongInput() {
        setSongInfo({title: null, desc: null, link: null})
    }

    function handleSongSubmit(e) {
        e.preventDefault();
        axios.post(serverLink + "/songs/add", songInfo)
        .then(res => {
            console.log("DATA: ", res.data)
            setSongArray([...songArray, res.data])
        })
        openCloseCS()
        clearSongInput()
    }


    function handleSongEdit(newInfo) {
        setNewSongInfo(newInfo)
    }

    function updatePlaylists() {
        axios.post(serverLink + "/playlists/updatePlaylistSongs", {id: id, newSongs: songArray})
        .then(res => {
            console.log(res)
            updateSongInfoArray()
        })
    }

    function updateSongInfoArray() {
        axios.post(serverLink + "/songs/findSongs", {songArray: songArray})
        .then(res => {
            console.log(res)
            setSongArrayInfo(res.data)
        })
    }

    function deleteSong(e, id) {
        e.preventDefault();
        axios.delete(serverLink + "/songs/deleteSong/" + id)
        .then(res => console.log(res))
        let songIndex = songArray.indexOf(id)
        console.log(id)
        console.log(songIndex)
        songArray.splice(songIndex, 1)
        console.log("SONGARRAY: ", songArray)
        updatePlaylists()
    }
    return (
        <div id="playlist-wrapper">
            <img src={image} alt="No image found." id="playlist-picture"></img>
            <h1 id="playlist-title">{playlistName}</h1>
            <h3 id="playlist-desc">{playlistDesc}</h3>
            {/* <h2 style={{"color": "white"}}> ID: {id} </h2> */}
            <div id="videos-wrapper">
            {songArray.map(currentSong => {
                let index = songArray.indexOf(currentSong)
                let route = "/video/" + songArray[index]
                if(songArray[index] !== undefined && songArrayInfo[index] !== undefined) {
                    return <Link style={{"textDecoration": "none"}} to={route} key={songArray[index]}><VideoCard title={songArrayInfo[index].songName || "No title found."} desc={songArrayInfo[index].songDesc || "No description found."} id={songArray[index]} deleteSong={(e, id) => deleteSong(e, id)} /></Link>
                }
                else { return null; }
             })}   
            </div>
            <button class="create-button" onClick={() => openCloseCS()} id="create-song-button"><i id="song-plus" className="fa fa-plus"></i></button>
            <div id="create-song-wrapper"><CreateSong handleChange ={(e) => handleSongChange(e)} handleSubmit={(e) => handleSongSubmit(e)} title={songInfo.title} desc={songInfo.desc} link={songInfo.link} /></div>
        </div>
      );
    
    function fetchData(id) {
        let route = serverLink + "/playlists/" + id
        let data = null
        axios.get(route)
            .then(res => {
                data = res.data
                if(data !== null && data !== undefined) {
                    console.log("DATA:", data)
                    setPlaylistName(data.playlistName)
                    setPlaylistDesc(data.playlistDesc)
                    setSongArray(data.songs)
                    setImage(data.image)
                }
            })    
    }
    function getDominantColor() {
        //For future, may change button color.
        let imageElement = document.getElementById("playlist-picture")
        let buttonElement = document.getElementById("cr-playlist-button")
        const rgb = getAverageRGB(imageElement)
        setDominantColor(rgb)
        let rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        //let darkerColor = `rgb(${rgb.r * 0.8}, ${rgb.g * 0.8}, ${rgb.b * 0.8})`
        imageElement.style.boxShadow = `0 0.5rem 10rem 1rem ${rgbColor}`
    }
}



 
export default Playlist; 