import React, {Component} from 'react';
import API from '../../utils/API';

class Logout extends Component{
state ={
    username:"",
    password: ""

};

handleButtonClick=e =>{
e.preventDefault();
API.Logout();


}

render(){
    return(


        <button onClick={this.handleButtonClick}>Logout</button>

    )
}





}



export default Logout;