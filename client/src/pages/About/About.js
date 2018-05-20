import React, { Component } from "react";
import "../../style.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import image from '../../images/sun.jpg';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

const stylejumbo = {
  backgroundImage: 'url('+image+')'
}

const hdr = {
  fontSize: 36
}

const quote = {
    fontSize: 36
}

class About extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userpath: ""
    };
  }

  handleOpen = () => {
    this.setState({open: !this.state.open});
  }

  handleClose = () => {
    this.setState({open: false});
  }
  componentDidMount() {
 
    let localId = localStorage.getItem("username")
    console.log(localId)
    this.setState({
      //category: event.target.value,
      username: localId
    })

    this.state.userpath = "/userhome/".concat(localId);
    console.log("about path "+this.state.userpath)
  }

  render() {
    return (

        <MuiThemeProvider>
        <AppBar
        title="Progression"
        onLeftIconButtonClick={this.handleOpen}
        onRightIconButtonClick={this.handleClick}
        />
        <Drawer open={this.state.open} close={this.handleClose}>
          <a href="/Signup"><MenuItem>Signup</MenuItem></a>
          <a href="/Login"><MenuItem>Login</MenuItem></a>
          <a href={this.state.userpath}><MenuItem>Userhome</MenuItem></a>
          <a href="/Search"><MenuItem>Search</MenuItem></a>
          <a href="/Home"><MenuItem>Main Home Page</MenuItem></a>
          <MenuItem onClick={this.handleClose}>X Close Menu</MenuItem>
        </Drawer>
       <div style={stylejumbo} className="jumbotronabout">
        <h1 id="about">Set Priorities by reaching your Goals!</h1>
         <blockquote id="about">”What you get by achieving your goals is not as important as what you become by achieving your goals.”
– Henry David Thoreau</blockquote>
 
      <br />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default About;
