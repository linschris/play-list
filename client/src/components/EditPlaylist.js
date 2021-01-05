import { React, useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import axios from "axios"
import inDevelopment from "../index"
const FR = new FileReader();

var serverLink;
if(inDevelopment) { serverLink = "http://localhost:5000/api" }
else { serverLink = "https://contraband-playlist.herokuapp.com/api" } 

const EditPlaylist = (props) => {
    const [originalInfo, setOriginalInfo] = useState(null)
    const [formInput, setFormInput] = useState({title: null, desc: null, image: null, imagePreview: null})
    const id = useParams().id;
    let playlistInfo = useLocation().state;
       

    useEffect(()=> {
        setOriginalInfo(playlistInfo)
    }, [id])

    function handleChange(e) {
        const {name, value} = e.target
        if(name === "image") {
            const imageFile = e.target.files[0]
            FR.addEventListener("load", function() {
                setImageData(imageFile, FR.result)
            })
            FR.readAsDataURL(imageFile)
        }
        else {
            let newFormInput = {...formInput, [name]: value}
            setFormInput(newFormInput)
        }   
    }

    function setImageData(imageFile, base64Data) {
        let newObject = {...formInput}
        newObject.imagePreview = URL.createObjectURL(imageFile)
        newObject.image = base64Data
        setFormInput(newObject)
    }

    function handleSubmit(e) {
        e.preventDefault();
        let newTitle = (formInput.title || formInput.title === " ") ? formInput.title : originalInfo.title 
        let newDesc = (formInput.desc || formInput.desc === " ") ? formInput.desc : originalInfo.desc 
        let newImage = (formInput.image || formInput.image === " ") ? formInput.image : originalInfo.image  
        let songs = originalInfo.songs
        let newImageType = originalInfo.imageType
        let newPlaylist = {title: newTitle, desc: newDesc, image: newImage, songs: songs, imageType: newImageType}
        axios.post(serverLink + "/playlists/updatePlaylist", {id: id, info: newPlaylist})
        .then(res => {
        })
    }



    return ( 
        <div class="create-wrapper"> 
            <form class="form">
                <div class="form-title">Edit Playlist</div>   
                <div id="edit-directions">Update one or more of the fields, leaving fields blank for attributes you don't want to change.</div>
                <input name="title" type="text" placeholder="New Playlist Name" onChange={(e) => handleChange(e)}></input>
                <textarea name="desc" id="create-desc" placeholder="New description" onChange={(e) => handleChange(e)}></textarea>
                <div id="image-wrapper">
                    {/* <label id="img-inp-tit" for="image" onChange={(e) => this.handleChange(e)}> Choose a new image:</label> */}
                    <input id="image-input" name="image" type="file" placeholder="Link" onChange={(e) => handleChange(e)}></input>
                    <button id="img-inp-but">Choose a new image</button>
                </div>
                <div id="img-upload-wrapper"><img id="img-upload"  alt="Nothing uploaded." src={formInput.imagePreview}></img></div>
                <button id="create-button" onClick={(e) => handleSubmit(e)}>Edit</button>
            </form> 
        </div>
     );
}
 
export default EditPlaylist;

