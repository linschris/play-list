import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
import '../assets/styles/LoginScreen.css'
const serverLink = "https://contraband-playlist.herokuapp.com/" //change to localhost later



class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            username: null,
            password: null,
            data: null,
            loggedIn: false
        }    
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
        axios.post(serverLink + "/users/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if(res.data !== null) {
                    console.log(res.data)
                    this.setState(prevState => ({
                        ...prevState, data: res.data, loggedIn: true
                    }))
                }
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
        let user = this.state;
        let userData = user.data;
        let userInfo = []
        if(userData !== null && userData.id !== null) { console.log(user.id); userInfo = [user.username, user.password, user.data]}

        if(this.state.loggedIn) return ( <Redirect to={{pathname: "/dashboard", state: { userInfo: userInfo }}} ></Redirect>)
        return (  
            <>
            <form id="sign-in-form">
                <div id="username">Sign In:</div>   
                <div id="user-input">
                <div id="user-icon"><i className="fa fa-user"></i></div>
                    <input id="username-input" name="username" type="text" placeholder="Username:" value={this.state.username || ""} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div id="pass-input">
                    <div id="pass-icon"><i className="fa fa-key"></i></div>
                    <input id="password" name="password" type="password" placeholder="Password:" value={this.state.password || ""} onChange={(e) => this.handleChange(e)}></input>
                    <button id="seepass-button" onClick={(e) => {this.seePassword(e)}}><i id="eye-icon" className="fa fa-eye-slash"></i></button>
                </div>
                <button id="login-button" onClick={(e) => this.handleSubmit(e)}>Login</button>
                <div id="sign-up-text">Don't have an account? <br></br> Don't worry, sign up <Link to="/signup">here.</Link></div>
            </form> 
            
            </>
        )
    }
}
 
export default LoginScreen;