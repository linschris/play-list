import { Component } from "react";
import { withRouter } from "react-router-dom"
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player"
import screenfull from "screenfull"
import axios from "axios"
import '../assets/styles/Video.css'
import '../assets/styles/fonts.css'
import inDevelopment from "../index";
// import VolumeSlider from "./VolumeSlider";

const serverLink = (inDevelopment) ? "http://localhost:5000" : "https://contraband-playlist.herokuapp.com" //change to localhost later




class Video extends Component {
    constructor(props) {
        super(props)

        this.state = {
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            embedLink: null,
            title: null,
            desc: null,
            volume: 0.5,
            playing: false,
            loop: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.turnOnOff = this.turnOnOff.bind(this)
        this.getOnOff = this.getOnOff.bind(this)
    }

    onClickFullScreen = () => {
        screenfull.request(findDOMNode(this.refs.videoPlayer))
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name + " " + value)
        this.setState(prevState => ({
            ...prevState, [name]: value
        }))
    }

    turnOnOff = (e) => {
        const {name} = e.target
        let newSetting = this.state[name] ? false : true
        this.setState({
            [name]: newSetting
        }, function() { console.log(this.state) })
    }

    getEmbedVideo() {
        if(this.state.link !== null && this.state.link !== undefined) {
            let videoID = this.state.link.split("v=")[1]
            let embedURL = "https://www.youtube.com/embed/" + videoID
                this.setState({
                    embedLink: embedURL
                })
        }
    }

    getOnOff = (boolean) => {
        return boolean ? "on" : "off"
    }

    fetchData(id) {
        let route = serverLink + "/songs/" + id
        axios.get(route)
        .then(res => {
            console.log(res.data)
            this.setState({
                title: res.data.songName,
                link: res.data.songLink,
                desc: res.data.songDesc
            }, function() {
                this.getEmbedVideo()
            })
        })
    }
    componentDidMount() {
        this.getEmbedVideo()
        console.log(this.props.match)
        const id = this.props.match.params.id;
        this.fetchData(id)
    }

    render() {
        console.log(this.state)
        return (
            <div id="video-wrapper">
                <h1 id="video-title">{this.state.title || "Title"}</h1>
                <ReactPlayer ref="videoPlayer" className="videoFrame" url={this.state.embedLink} playing={this.state.playing} loop={this.state.loop} volume={this.state.volume} controls={1} />
                <div id="volume-controls">
                    {/* <VolumeSlider handleChange={(e) => this.handleChange(e)}/> */}
                    {/* <button id="video-fs" onClick={this.onClickFullScreen}>Fullscreen</button>  */}
                    <button id="autoplay" name="playing" className={this.getOnOff(this.state.playing)} onClick={(e) => this.turnOnOff(e)}>Autoplay</button>
                    <button id="loop" name="loop" className={this.getOnOff(this.state.loop)} onClick={(e) => this.turnOnOff(e)}>Loop</button>
                </div>
                <p id="video-desc" className="thin">{this.state.desc}</p>
                {/* <iframe className="videoFrame" title="Title" src="https://www.youtube.com/embed/tTwav32SvJA?autoplay=1&mute=1" frameBorder="0" allow='autoplay; encrypted-media' allowFullScreen></iframe> */}
                
            </div>
        )
    }
}
export default withRouter(Video)