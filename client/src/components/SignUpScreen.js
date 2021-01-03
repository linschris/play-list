import React, { Component } from 'react';
import {
    Link
  } from "react-router-dom";
import axios from "axios"
import '../assets/styles/SignUpScreen.css'


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
        console.log("Submitted: ", this.state)
        axios.post("http://localhost:5000/users/add", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                console.log(res)
                
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

        console.log(classToChange)
    }

    


    render() { 
        return (  
            <>
            <form id="sign-up-form">
                <div id="username">Sign Up:</div>   
                <div id="user-input">
                <div id="user-icon"><i class="fa fa-user"></i></div>
                    <input id="username-input" name="username" type="text" placeholder="Create a username:" value={this.state.username || ""} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div id="pass-input">
                    <div id="pass-icon"><i class="fa fa-key"></i></div>
                    <input id="password" name="password" type="password" placeholder="Create a password:" value={this.state.password || ""} onChange={(e) => this.handleChange(e)}></input>
                    <button id="seepass-button" onClick={(e) => {this.seePassword(e)}}><i id="eye-icon" class="fa fa-eye-slash"></i></button>
                </div>
                <button id="login-button" onClick={(e) => this.handleSubmit(e)}>Create an Account</button>
                <div id="sign-up-text">Have an account? <br></br> Login <Link to="/">here.</Link></div>
            </form> 
            
            </>
        )
    }
}
 
export default LoginScreen;