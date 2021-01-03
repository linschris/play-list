import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import inDevelopment from "../index"

const serverLink = (inDevelopment) ? "http://localhost:5000" : "https://contraband-playlist.herokuapp.com" //change to localhost later


const EditSong = (props) => {
    const [originalInfo, setOriginalInfo] = useState(null)
    const [formInput, setFormInput] = useState({title: null, link: null, desc: null})
    const id = useParams().id;
    const location = useLocation().state.playlistId;

    useEffect(()=> {
        axios.get(serverLink + "/songs/" + id)
        .then(res => {
            setOriginalInfo(res.data)
        })
    }, [id])

    function handleChange(e) {
        const {name, value} = e.target
        let newFormInput = {...formInput, [name]: value}
        setFormInput(newFormInput)
    }

    function handleSubmit(e) {
        e.preventDefault();
        let newTitle = (formInput.title || formInput.title === " ") ? formInput.title : originalInfo.songName 
        let newDesc = (formInput.desc || formInput.desc === " ") ? formInput.desc : originalInfo.songDesc 
        let newLink = (formInput.link || formInput.link === " ") ? formInput.link : originalInfo.songLink 
        console.log(newTitle + " " + newDesc + " " + newLink)
        let newSong = {title: newTitle, desc: newDesc, link: newLink}
        console.log("ID:", id)
        axios.post(serverLink + "/songs/updateSong", {id: id, info: newSong})
        .then(res => {
            console.log(res)
            console.log(id)
            console.log(location)
            window.location.href = "/playlist/" + location
        })
        //window.location.href = "" <-- url back
    }

    return (
        <>
        <div class="create-wrapper"> 
            <form class="form">
                <div class="form-title">Edit Song:</div>   
                <div id="edit-directions">Update one or more of the fields, leaving fields blank for attributes you don't want to change.</div>
                <input name="title" type="text" placeholder="New Song/Video Title" onChange={(e) => handleChange(e)}></input>
                <input name="link" type="text" placeholder="Link" onChange={(e) => handleChange(e)}></input>
                <textarea name="desc" id="create-desc" placeholder="New description" onChange={(e) => handleChange(e)}></textarea>
                <button id="create-button" onClick={(e) => handleSubmit(e)}>Edit</button>
            </form> 
        </div>
        </>
    )
}
 
export default EditSong;
