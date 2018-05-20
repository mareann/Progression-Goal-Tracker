import React, { Component} from "react";
import{Jumbotron,Button,Grid,Row,Col,Image,Thumbnail} from "react-bootstrap"
import "./Home.css"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import image from '../../images/write.jpg';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import Login from "../../components/LogIn";
// import Signup from "../../components/Signup";
import ReactRotatingText from "react-rotating-text"

const styles = {
  title: {
    cursor: 'pointer',
  },
};


const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({open: !this.state.open});
  }
  
  handleClose = () => {
    this.setState({open: false});
  }
    
render () {
    return (
    <div>
    <MuiThemeProvider>
    <AppBar
    title="Progression"
    onLeftIconButtonClick={this.handleOpen}
    onRightIconButtonClick={this.handleClick}
    />
    <Drawer open={this.state.open} close={this.handleClose}>
      <a href="/Signup"><MenuItem>Signup</MenuItem></a>
      <a href="/Login"><MenuItem>Login</MenuItem></a>
      <a href="/About"><MenuItem>About</MenuItem></a>
      <a href="/Search"><MenuItem>Search</MenuItem></a>
      <MenuItem onClick={this.handleClose}>X Close Menu</MenuItem>
    </Drawer>
    </MuiThemeProvider>

        <Grid className="image">
        <Jumbotron className="jumbotron">
        <div className="jumbocontainer">
        <h5>Progression</h5>
        <h6> Join us </h6>
        <ReactRotatingText className='landingRotating' items={['to learn new goals', 'to share goals', 'to check your goals', 'to simplify planning']} />
        <p>
          <a href="/Signup"><Button bsStyle="primary" className="button">Lets get Started!</Button></a>
        </p>
        </div>
      </Jumbotron >
        <Row className="show-grid" id="flex">
        <Col xs={6} md={4} >
        <Image src="../../images/write.jpg" className="intro" thumbnail/>
        
        <h1> Share Goal, Make Connections </h1>
        <p>Share your goals with others. you will receive encouragmeent and advice along the way. Encourage others as they work on their goals! </p>
        
        </Col>
        
        <Col xs={6} md={4} >
        <Image src="../../images/mind.jpg" className="intro" thumbnail/>
        <h1> Goal Idea </h1>
        <p>Have an idea for a goal? Maybe its following new excercise plan, going on a diet or learning new language. Your goal is not out of reach!</p>
       
        </Col>

        <Col xs={6} md={4}>
        <Image src="../../images/friends.jpg" className="intro" thumbnail />
        <h1> Plan Goal</h1>
        <p>Define your goals and make a plan. We will help you along the way!</p>
        </Col>
 
        </Row>

        <Row className="show-grid">
        <Col>
        <br/>
        <br/>
        <h1 style={{marginLeft:"36px"}}> We are here to make you set up your goals easily and more accessible! <br/><br/>PROGRESSION TEAM<br/><br/>Kayle, Angela, Daniel, Maryann</h1>        
        </Col>
         <Image style={{marginLeft:"36px",marginTop:"24px"}} src="../../images/progression.jpg" className="intro" thumbnail/>
         <br/>
        </Row>
        </Grid>
        </div>
    )
  }
}

export default Home;