import React, { Component } from "react";
import "./style.css";
import Userhome from './pages/Userhome';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Fileupload from "./pages/Fileuploader";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Search from './pages/Search';

//injectTapEventPlugin();
function handleClick(e) {
  e.preventDefault();
  window.location.replace("./Login");
}
// function handleLoginButton = () =>{
//   window.location="/login"
// }
// function handleSignupButton=()=>{
//   window.location="/signup"
// }


const App = () => (

  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} /> 
        <Route exact path="/userhome/:username" component={Userhome} />       
        <Route exact path="/category/:keyword" component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Signup" component={Signup}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/logout" component={Home}/>
      </Switch>
    </div>
  </Router>

);

export default App;
