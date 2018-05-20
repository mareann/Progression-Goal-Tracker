import React from "react";
import { ListItem } from "../List";
//import formatDate from "../../utils/formatDate";

const Goalitem = (props) => {
let saved;
return (

  <ListItem>
    <h3>
      <em>{props.category}</em>{" "}
      <span className="btn-group pull-right">
        <a
          className="btn btn-light"
          href={props.category}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Goal
        </a> 
        <button onClick={() => props.handleClick(props._id)} className="btn btn-primary">
          {props.buttonText}
        </button>
      </span>
    </h3>
    <p>
      Date {saved ? "Saved" : "Published"}: {props.date}
    </p>
  </ListItem> 
)};


export default Goalitem;
