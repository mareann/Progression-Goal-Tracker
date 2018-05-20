import React from "react";
import FlatButton from 'material-ui/FlatButton';
import image from '../../images/sun.jpg';
import "../../style.css";

const stylejumbo = {
  backgroundImage: 'url('+image+')'
}

const Goalform = props => (
    <form role="form">

        <label for="goalCategory">Goal Category:</label><br/>
        <button value="Health" onClick={props.handleCategory} className="btn btn-info goal" id="health-goal">Health</button>
        <button value="Fitness" onClick={props.handleCategory} className="btn btn-info goal" id="fitness-goal">Fitness </button>
        <button value="Home" onClick={props.handleCategory} className="btn btn-info goal" id="home-goal">Home </button>
        <button value="Hobbies" onClick={props.handleCategory} className="btn btn-info goal" id="hobbies">Hobbies </button>
        <button value="Social" onClick={props.handleCategory} className="btn btn-info goal" id="social-goal">Social </button>
        <button value="Efficiency"  onClick={props.handleCategory} className="btn btn-info goal" id="efficiency-goal">Efficiency </button> 
        <br/>
        <label for="Goal">Goal Description:</label>
        <input 
        type="text" 
        name="description"
        className="form-control" 
        id="Goal"
        value={props.description}
        name="description"
        onChange={props.handleInputChange}
        value={props.description}
        />
      <label for="exampleFormControlFile1">Image upload:</label>
      <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={props.fileChangeHandler}/>
      <button
      onClick={props.handleFormSubmit}
      type="submit" 
      className="btn btn-info" 
      id="createGoal"> Create Goal</button>
      <br/>
    </form>

);

export default Goalform;
