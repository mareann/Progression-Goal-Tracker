import React from "react";
//import FlatButton from 'material-ui/FlatButton';
import image from '../../images/sun.jpg';
import "../../style.css";

const stylejumbo = {
  backgroundImage: 'url('+image+')'
}

const Goalsearchform = props => (
  <div>
    <form role="form" className="menu">
      <div className="form-group">
        <label for="searchCategory">Search goals by Category:</label><br />
        <button value="Health" className="btn btn-info" onClick={props.handleCategory} id="health">Health</button><br/>
        <button value="Fitness" className="btn btn-info" onClick={props.handleCategory} id="fitness">Fitness </button><br/>
        <button value="Home" className="btn btn-info" onClick={props.handleCategory} id="home">Home </button><br />
        <button value="Hobbies" className="btn btn-info" onClick={props.handleCategory} id="hobbies">Hobbies </button><br/>
        <button value="Social" className="btn btn-info" onClick={props.handleCategory} id="social">Social </button><br />
        <button value="Efficiency" className="btn btn-info" onClick={props.handleCategory} id="efficiency">Efficiency </button> 
      </div>
    </form>
  </div>
);

export default Goalsearchform;
