import React from "react"


export default class EditPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
   
    render() {
        console.log("PROPS: ", this.props)
        return (
            <>
            <div id="create-playlist-wrapper"> 
                <form id="playlist-form">
                    <div id="create-title">Edit :PlaylistName:</div>   
                    <input name="title" type="text" placeholder="New Playlist Title" onChange={(e) => this.props.handleChange(e)}></input>
                    <textarea name="desc" id="create-desc" placeholder="New description" onChange={(e) => this.props.handleChange(e)} ></textarea>
                    <label for="image" style={{"color": "white"}}>New image: </label>
                    <input id="image" name="image" type="file" placeholder="Playlist Image" value="" onChange={(e) => this.props.handleChange(e)} ></input>
                    <img id="imageUpload"  alt="Nothing uploaded." src={this.props.image}></img>
                    <button id="create-button" onClick={this.props.handleSubmit}>Create</button>
                </form> 
            </div>
            </>
        )
    }
}