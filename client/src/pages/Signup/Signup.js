import React, { Component} from "react";
import API from "../../utils/API"
import ReactDom from "react-dom"
import "./Signup.css";
import {link} from "react-router-dom"
import Home from "../Home/Home" 
import image from '../../images/wallpaper.jpg';
import axios from "axios";
const stylejumbo = {
    backgroundImage: 'url('+image+')'
  }


  class Signup extends Component {
    //this  sets states of username input
    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
            email:"",
            firstName:"",
            lastName:"",
            errors: [],
            isRegistered:false,
            usernameError:false,
            passwordMatch:false,
            userExistsError:false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    //this function lets you change your state to registered once its clicked
    completeRegistration = () =>{
        this.setState({
            isRegistered: true
        })
    }
    onChange = (e) => {
        
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    loopError = (errors) =>{
        this.setState({
            errors: errors,
            passwordMatchError:false,
            usernameError: false,
            userExistError: false
        })

        if(errors.userExists){
            console.log("DOES USER EXISTS? " + this.state.userExistsError);
            this.setState({
                userExistsError: true
            })
            } 
        else {
            for(var i=0; i<errors.length; i++){
                if(errors[i].param === "confirmpassword"){
                    this.setState({
                        passwordMatchError: true
                    })
                }
            }
        }
    }
    //once submit is clicked it goes to API and to axio calls to put user info in database
    onSubmit=(e) => {
        e.preventDefault();
        const{ username, password,firstName,lastName, email}= this.state
        console.log(this.state.username)
        API.submitSignup({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,

        })
        .then(res => {
            console.log("response.data: " + res); 
            if(res.registrationSuccess){
            this.completeRegistration();
            }
            else{
                this.loopError(res);
            }
        })
        .catch(err => console.log(err));
    }
    
    
    render(){
        // const { userName, password} = this.state;
        const homePage = (<Home/>)
        const registrationForm = (
            <div style={stylejumbo} className="container">
                <div id="id01" className="static-modal">
                    
                    <form className="modal-content" onSubmit ={this.onSubmit} >
                    <div className="container">
                    
                        <img src="../../images/progression.jpg" alt="Avatar" className="avatar"/>   
                        <h2>Sign up to your Progression account to access all your Goal.</h2>
                        <p>Please fill in this form to create an account.</p>
                        <hr/>
                        <label htmlFor="email"><b>First Name</b></label>
                        <input type="text" placeholder="Enter FirstName"onChange={this.onChange}  value ={this.state.firstName} name="firstName"required />
                        <label htmlFor="email"><b>Last Name</b></label>
                        
                        <input type="text" placeholder="Enter Last Name" onChange={this.onChange} value ={this.state.lastName}name="lastName" required />
                        
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" onChange={this.onChange} value ={this.state.email} name="email" required />
                        
                        <label htmlFor="username"><b>User Name</b></label>
                        <input type="text" placeholder="Enter Username" onChange={this.onChange} name="username" value ={this.state.username} required />
                        
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" onChange={this.onChange} name="password" value ={this.state.password} required />
                        
                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input type="password" placeholder="Repeat Password" onChange={this.onChange} name="psw-repeat" required />
                        
                        <div className="clearfix">
                            <button type="submit" className="signupbtn">Sign Up</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
        return this.state.isRegistered ? homePage : registrationForm
    }
};
export default Signup;

