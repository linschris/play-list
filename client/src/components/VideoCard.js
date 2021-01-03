 import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/styles/Playlist.css"

function VideoCard(props) {
    console.log("PROPS", props)

    

    return (
        <div id="video-card-wrapper">
            <div id="title">
                {props.title || "No title found."}
                <div id="desc">{props.desc || "This is a description. Feel free to add a description to highlight what this video talks about."}</div>
            </div>
            <Link to={{pathname: "/editSong/" + props.id, state: {playlistId: props.playlistId}}}><button class="edit-button"><i class="fa fa-edit"></i></button></Link>
            <button class="trash-button" onClick={(e) => props.deleteSong(e, props.id)}><i class="fa fa-trash"></i></button>
        </div>
    )
}

export default VideoCard;