import React, {Component} from "react";
import "./Login.css";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from "../../utils/API"
import image from '../../images/wallpaper.jpg';
import Userhome from "../Userhome/Userhome"
import Home from "../Home/Home"

const background = {
    backgroundImage: 'url('+image+')'

}

class Login extends Component {
    //this sets states in react for user login info 
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: "",
            loginSuccessful: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    };
    //this function lets you know that if user log in was successful
    completeLogin = () =>{
        this.setState({
            loginSuccessful: true
        })
    }

    onChange = (e) => { 
    const { name, value } = e.target;
    this.setState({
        [name]: value
    });
  
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        API.submitLogin({
            //put value from fields here. 
            username: this.state.username,
            password: this.state.password,
        })
        .then((res, req) => {
            console.log("response from server at login.");

            // TODO add code to redirect 
            // console.log("res1"+res)
            // console.log("req"+ req)
            const user = this.state.username;
            console.log(user)
            const newlink = "./userhome/" + user
            this.completeLogin();
            window.location.replace(newlink);
        })
        .catch(err => console.log(err));
        }
    



    render() {
        const homePage=(<Userhome/>)
        const loginForm =(
            <div style={background} className="container">
                <div id="id01" className="static-modal">
                    <form className="modal-content animate" onSubmit={this.onSubmit}>
                        <div className="imgcontainer">
                            <img src="../../images/progression.jpg" alt="Avatar" className="avatar1"/>
                            {/* <h1> Progression Login</h1> */}
                            <br/>
                            <h2>Log in to your Progression account to access all your Goal.</h2>
                        </div>
                        <div className="container">
                            <label ><b>Username</b></label>
                            <input type="text" value ={this.state.username} placeholder="Enter Username" name="username" onChange ={this.onChange} required />
                            <label><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" value ={this.state.password} name="password" onChange={this.onChange} required />
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
        return this.state.loginSuccessful? homePage : loginForm
    }
};

// const mapStateToProps = (state, ownProps) => {
//     return {user: state.currentUser.user};
    
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         onSuccessfullLogin: (user) => {
//             dispatch(loginUser(user))
//         }
//     } 
// };



export default Login;
// export default connect(mapStateToProps,mapDispatchToProps)(Login);