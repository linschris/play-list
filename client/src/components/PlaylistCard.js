import { useEffect } from "react";
import { Link } from "react-router-dom"


const PlaylistCard = (props) => {
    function deletePlaylist(e) {
        props.deletePlaylist(e, props.index);
    }
    return ( 
        <div className="playlist-card" id="playlist-card">
            <div id="playlist-license"> <i class="fa fa-id-card"></i> play-list card</div>
            <div id="playlist-s1">
                <img id="playlist-image" src={props.image} alt="No image found."></img>
                <div id="playlist-s1-info">
                    <div id="playlist-title"> <i class="fa fa-user"></i> {props.title} </div>
                    <div id="playlist-desc"> <i class="fa fa-pencil"></i> {props.desc} </div>
                    <div id="playlist-songs"> <i class="fa fa-music"></i> {props.songs.length} Songs</div>
                </div>
            </div>
            <div id="playlist-s2">
                <div id="playlist-id"> {props.id} </div>
                <div id="playlist-buttons">
                    <Link to={{pathname: "/editPlaylist/" + props.id, state: {title: props.title, desc: props.desc, image: props.image, songs: props.songs, imageType: "jpeg"}}}><button id="edit-pl-button" class="edit-button"><i class="fa fa-edit"></i></button></Link>
                    <button id="del-pl-button" class="trash-button" onClick={(e) => deletePlaylist(e)}><i class="fa fa-trash"></i></button>
                </div>
            </div>
            
        </div>  
    )
}
 
export default PlaylistCard;

/*


<div id="playlist-image-wrapper">
                <img id="playlist-image" src={props.image} alt="No image found."></img>
            </div>
            <div id="playlist-title"> {props.title} </div>
            <div id="playlist-desc"> {props.desc} </div>

*/