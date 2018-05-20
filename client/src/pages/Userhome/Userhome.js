import React, { Component } from "react";
import "../../style.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import API from "../../utils/API";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import image from '../../images/wallpaper.jpg';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Row,Col,Container} from "../../components/Grid"
import {List,ListItem} from "../../components/List";
import RaisedButton from 'material-ui/RaisedButton';
import Goalform from "../../components/Goalform";
import Goalheader from "../../components/Goalheader";
import Goalsfollowing from "../../components/Goalsfollowing";
import axios from "axios";
import Slider from 'material-ui/Slider';
// import Nav from "../../components/Nav";
//var ObjectId = require('mongoose').Types.ObjectId;

const stylejumbo = {
  backgroundImage: 'url('+image+')'

}

const color = {
  backgroundColor: '#00b4ce'
}

const color2 = {
  backgroundColor: '#A9A9A9'
}

function handleClick(e) {
  e.preventDefault();
}

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: 'yellow'
  },
});


class UserHome extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false,
      description: "",
      category: "",
      defaultimg: "start.jpeg",
      file: null,
      awsbaseurl: "https://progressionapp.s3.amazonaws.com/",
      result: null,
      goals: [],
      username: "",
      percent: "",
      message: "",
      slider: 0,
      _id: 0
    };
    this.handleFormSubmit= this.handleFormSubmit.bind(this)
    this.handleInputChange=this.handleInputChange.bind(this)
    //this.handleSliderSubmit=this.handleSliderSubmit.bind(this)
  }

  handleSlider = (event, value) => {
    this.setState({slider: value});
  };

  handleOpen = () => {
    this.setState({open: !this.state.open});
  }
  
  handleClose = () => {
    this.setState({open: false});
  }

  componentDidMount() {
 
    const patharr =  window.location.pathname.split('/');
    const id = patharr[patharr.length-1];
    console.log("this is the the ID: " + id)
    this.getGoals(id);
    localStorage.setItem("username",id)
    if (id)
      this.state.username = id;
    // this.getGoals(id);

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value 
    });
  };

  UserGoals = (id) => {
    console.log("usergoal "+id)
    this.setState({
      username: id
    })

   //console.log(this.state.username)
   API.getGoalsUser(id)        
    .then(res => {

      console.log("Userhome: api getgoaluser "+JSON.stringify(res.data))
      let tmpgoal = res.data[0].goal;
      let tmpdata = [];
      let i = 0
      while ( i < res.data.length ) {

        tmpgoal = res.data[i].goal
        //console.log ( "#1 loop i "+i+" goal "+tmpgoal+" percent "+res.data[i].percent)
        
        if (res.data.length >= 1) 
        {
          
          //console.log("#2 datalength "+res.data.length)
         
          if ( i < res.data.length-1
            && res.data[i+1].goal !== tmpgoal)
            {
              if ( i === 0 ) 
              {
                tmpdata.push(res.data[0])
                tmpgoal = res.data[1].goal;
                console.log("#3 PUSH 0")
               }
              i++;
              continue;         
            }     
            else
              {
                //console.log("#6 before while no tmpdata equal i "+i+" tmpgoal "+tmpgoal+"percent "+res.data[i].percent)
                //console.log(" length "+res.data.length)
                while ( i <= res.data.length && res.data[i].goal === tmpgoal ) //res.data[i+1].goal)
                 {
                   //console.log("#7 --- while before i inc "+i)

                   tmpgoal = res.data[i].goal
                   if ( i >=res.data.length-1)
                     break;
                   i++
                 
                   //if ( i < res.data.length ) 
                   // {    
                   //     console.log("#8 --- while after i inc tmpgoal "+tmpgoal+"percent "+res.data[i].percent)                 
                   //     console.log("#9 *** while no tmpdata equal i "+i+" tmpgoal "+tmpgoal+"percent "+res.data[i].percent)
                   // }
                 } //end while

                 //console.log("#10 %%% --- else after while i "+i +" tmpgoal "+tmpgoal)
               
               if ( i < res.data.length-1)
                i++;
              } // end else
            //if ( i < res.data.length)
            //  console.log("#11 after while goals equal i "+i+" tmpgoal "+tmpgoal+"percent "+res.data[i].percent)
          
            if ( i < res.data.length-1) 
            {
              console.log("#12 PUSH after while push i "+i+" percent "+res.data[i].percent)
              tmpdata.push(res.data[i])
             
              if (i < res.data.length-1) 
              {
               tmpgoal = res.data[i].goal
               //console.log("#13 i "+i+" while goal inc bottom percent "+res.data[i].percent)
              }
            }

        } // end if large

        //console.log("#14 i "+i+" after while before if")
        if ( i < res.data.length) 
         {
            console.log("#15 PUSH after while push i "+i+" "+res.data[i].percent+
            " goal "+res.data[i].goal);
            tmpdata.push(res.data[i])
         }

       if (tmpdata.length > 0)
        {
          console.log("#16 setState "+JSON.stringify(tmpdata))
          this.setState({
           goals: tmpdata
         })
        }      
       i++;
        //console.log("#17 end of while inc i to "+i)
      } // end while
      
      //console.log("#18 after goals data "+JSON.stringify(this.state.goals))

     } // end .then
    )
    .catch(err => console.log(err)) 
 
  }

  handleGoal = (id) => {
  //let id = '5af4912e04f888219c1c00b1'
    console.log("handleGoal id "+JSON.stringify(id))
    // console.log("goals "+this.state.goals)
    API.getGoal(id)
    .then (res => {
        console.log("handleGoal "+JSON.stringify(res.data))
  
        //console.log("handleGoal state "+this.state.displayState); //this.displayState())
        this.setState({
          goals: res.data,
          message: !res.data
            ? "No New Goals Found, Try a Different Goal"
            : "Here is your goal"
        })
      }
      )
      .catch(err => console.log(err)) 
   
  }

  getGoals = (user) => {

    console.log("getGoals")

    API.getGoalsUser(user)
    .then(res => {
      console.log(res.data);
      
      this.setState({
        goals: res.data
      });
    })
    .catch(err => console.log(err));
  };

  uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                alert(`File has succesfully uploaded!`);
            } else {
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
  }

  getSignedRequest = (file) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    // xhr.open('GET', `/api/sign-s3`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                this.uploadFile(file, response.signedRequest, response.url);
            } else {
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
  }

  clearForm = () =>{
    this.setState({
      description: "",
      category: "",
      file: null
    });
  }


  handleFormSubmit = event => {
    event.preventDefault();
    console.log("I made it here");

    const patharr =  window.location.pathname.split('/');
    const id = patharr[patharr.length-1];

    var imgFileName;

    //checking to see if the file state is not null
    if (this.state.file !== null){
      //set the local var with the file name
      imgFileName = this.state.file.name;
      //upload the iamge to AWS S3 bucket
      this.getSignedRequest(this.state.file);
      //Let the user know their image was uploaded
      alert("Image Successfully Uploaded");
    } else {
      //if file is null, then set the local var to the default image
      imgFileName = this.state.defaultimg;
    }
    
    console.log("User id when submitted" + id)

    this.setState({
      username: id
    });
    
    console.log("I am the user" + this.state.username)
    
    console.log("handleFormSubmit")
    //this.getGoals();
    //this.UserGoals()
    console.log(this.state)
    const{username,category,description,filename} = this.state
    let tmp = this.state.description.toUpperCase();
    console.log("tmp desc "+tmp)
    API.saveGoal({
      username:id,
      category:this.state.category,
      description: tmp,              //this.state.description,
      filename: imgFileName
    })
    .then(res => {
      console.log("apisavegoalworked")
    })
    .catch(err => console.log(err));

    //once the data is uploaded to the database, then clear out the form
    console.log(this.state.username);
    this.getGoals(this.state.username);
    this.clearForm();

    // this.UserGoals(this.state.username);
    // this.getGoals(this.state.username);

  };

  fileChangeHandler = event => {
    this.setState({file:event.target.files[0]}) 
  };


  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
       // this.handleGoal(id)
    //console.log("handleToggle id "+id)
  };

  // handleSliderSubmit = event => {
  //   //console.log("slider "+this.state.slider)
  //   console.log("handleSliderSubmit ") //+index)
  //   event.preventDefault();
  //   console.log("event "+event.target.value)
  //   this.setState({
  //     //percent: event.target.value,
  //     slider: event.target.value
  //   })
  //   API.saveGoal({
  //     username:this.state.username,
  //     guser:this.state.username,
  //     category:this.state.category,
  //     goal:this.state.goal,
  //     percent:Math.round(100*this.state.slider)
  //   })
  //   .then(res => {
  //     console.log("button api savegoalworked")
  //   })
  //   .catch(err => console.log(err))
  //   //console.log("goal.id "+goal._id)
  //  // console.log("this.state.slider "+this.state.slider)
  // }

  handleCategory = (event) =>{
    event.preventDefault();
    this.setState({
      category: event.target.value
    })
    console.log(this.state.category)
  }

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleSliderClick = (id) => {

    console.log("handleSliderClick "+id)

    let tmp = Math.round(100*this.state.slider)
    this.state.percent = tmp

    console.log(tmp)
    API.updateGoal({
      _id: id,
      percent: tmp
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err));
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
          <a href="/Search"><MenuItem>Search</MenuItem></a>
          <a href="/Home"><MenuItem>Main Home Page</MenuItem></a>
          <a href="/About"><MenuItem>About</MenuItem></a>
          <a href="/logout"><MenuItem>Logout</MenuItem></a>
          <MenuItem onClick={this.handleClose}>X Close Menu</MenuItem>
        </Drawer>

        <div style={stylejumbo} className="jumbotron">
         <h1>{this.state.username} Set Your Goals!</h1>

          <Goalform id="goal-form"
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          handleCategory={this.handleCategory}
          description={this.state.description}
          category={this.state.category}
          fileChangeHandler={this.fileChangeHandler}
          />
        </div>

        <div>
        <List>
          <Goalheader />
          {this.state.goals.map((goal,i) => (
          <div>

            <Card style={color} key={i} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
              <CardHeader
                title={goal.description} 
                subtitle={goal.category} 
                avatar={image}
                actAsExpander={false}
                showExpandableButton={true}
              />

              <CardText>
                <Toggle
                  toggled={this.state.expanded}
                  onToggle={this.handleToggle}
                  labelPosition="right"
                  label=""
                />

              </CardText>
              <CardMedia
                expandable={true}
                overlay={false}
              > 
              </CardMedia> 
              
              <CardTitle title={goal.description} subtitle={goal.category} expandable={true} style={{padding:'0 16px'}} />
              <CardMedia expandable={true} style={{maxWidth:"25%", marginRight:"auto", marginLeft:"auto"}}
              >
                <img src= {this.state.awsbaseurl + goal.filename} alt={goal.description} />
              </CardMedia>
              
              <CardText expandable={true} style={{fontSize: "1.25em"}}>
                You are at {goal.percent} percent of your goal!
                <br/><br/>Move your slider bar to set recent progress!
    <MuiThemeProvider muiTheme={muiTheme}>
        <Slider
          value={this.state.slider}
          onChange={this.handleSlider}
        />
        </MuiThemeProvider>
        <p>
          <span>{'You are setting your percentage to: '}</span>
          <span>{Math.round(100*this.state.slider)}%</span>
          <br/><span style={{fontSize:"1rem"}}>Select Save Progress to update!</span>
        </p>
      <button
      type="submit" 
      className="btn btn-light" 
      key={i}

      id={goal._id} type="submit" onClick={() => this.handleSliderClick(goal._id)}
      > Save progress 
      </button>
              </CardText>
            </Card>
           <br />
          </div> 
         ))}
       </List>
     </div>
        <Goalsfollowing />
        <div>
          <Card style={color2} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title="Goal Name"
            subtitle="Diet"
            avatar={image}
            actAsExpander={false}
            showExpandableButton={true}
          />
          <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label=""
          />
        </CardText>
        <CardMedia
          expandable={true}
          overlay={false}
        > 
        </CardMedia>
        <CardTitle title="Goal Title" subtitle="Diet" expandable={true} />
        <CardText expandable={true}>
          My goal is to eat more fruits and vegetables.
          <Slider />
        </CardText>
      </Card>
      <br />
      </div>

    </MuiThemeProvider>
    );
  }
}

export default UserHome;