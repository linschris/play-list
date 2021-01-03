
const CreateSong = (props) => {
    return (  
        <div> 
            <form id="playlist-form">
                <div id="create-title">Create a new Song/Video:</div>   
                <input name="title" type="text" placeholder="Title" onChange={(e) => props.handleChange(e)} value={props.title}></input>
                <input name="link" type="text" placeholder="Link" onChange={(e) => props.handleChange(e)} value={props.link}></input>
                <textarea name="desc" id="create-desc" placeholder="Enter a cool description." onChange={(e) => props.handleChange(e)} value={props.desc}></textarea>
                <button id="create-button" onClick={(e) => props.handleSubmit(e)}>Create</button>
            </form> 
        </div>
    );
}
 
export default CreateSong;

