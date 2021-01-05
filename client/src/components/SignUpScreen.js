import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
import '../assets/styles/SignUpScreen.css'
import inDevelopment from "../index"

var serverLink;
if(inDevelopment) serverLink = "http://localhost:5000/api" 
else { serverLink = "https://contraband-playlist.herokuapp.com/api" } //change to localhost later


 


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            username: null,
            password: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(serverLink + "/users/add", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                window.location.href = "/"
                
            })
            .catch(err => {
                console.log(err)
            })
    }

    seePassword(e) {
        e.preventDefault();
        let passwordInput = document.getElementById("password")
        let newType = passwordInput.type === "password" ? "text" : "password"
        passwordInput.type = newType

        //Change to different icon
        let eyeIcon = document.getElementById("eye-icon")
        let classToChange = eyeIcon.classList[1]
        eyeIcon.classList.remove(classToChange)
        let newIcon = classToChange === "fa-eye" ? "fa-eye-slash" : "fa-eye"
        eyeIcon.classList.add(newIcon)

    }

    


    render() { 
        return (  
            <>
            <form id="sign-up-form">
                <div className="sign-form-title">Sign Up:</div>   
                <div id="user-input">
                    <div id="user-icon"><i class="fa fa-user"></i></div>
                    <input id="username-input" name="username" type="text" placeholder="Create a username:" value={this.state.username || ""} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div class="pass-input">
                    <div id="pass-icon"><i class="fa fa-key"></i></div>
                    <input id="password" name="password" type="password" placeholder="Create a password:" value={this.state.password || ""} onChange={(e) => this.handleChange(e)}></input>
                    <button id="seepass-button" onClick={(e) => {this.seePassword(e)}}><i id="eye-icon" class="fa fa-eye-slash"></i></button>
                </div>
                <div id="login-button-wrapper"><button id="login-button" className="opt-but" onClick={(e) => this.handleSubmit(e)}>Create an Account</button></div>
                <div id="sign-up-text">
                    <span>Have an account?</span>
                    <br></br> 
                    <div id="sign-up-wrapper"><Link to="/"><button className="opt-but">Login</button></Link></div>
                </div>
            </form> 
            
            </>
        )
    }
}
 
export default LoginScreen;