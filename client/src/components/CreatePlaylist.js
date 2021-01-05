import React from "react"
import '../assets/styles/CreatePlaylist.css'


export default class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
   
    render() {
        return (
            <>
            <div> 
                <form id="playlist-form">
                    <div id="create-title">Create a new Playlist:</div>   
                    <input name="title" type="text" placeholder="Playlist Title" onChange={(e) => this.props.handleChange(e)} value={this.props.title}></input>
                    <textarea name="desc" id="create-desc" placeholder="Enter a cool description." onChange={(e) => this.props.handleChange(e)} value={this.props.desc}></textarea>
                    <label for="image" style={{"color": "white"}}>Select an image: </label>
                    <input id="image" class="hidden" name="image" type="file" placeholder="Playlist Image"  onChange={(e) => this.props.handleChange(e)}></input>
                    <img id="imageUpload"  alt="Nothing uploaded." src={this.props.image}></img>
                    
                    <button id="create-button" onClick={this.props.handleSubmit}>Create</button>
                </form> 
            </div>
            </>
        )
    }
}