/////////////////////////////////////////////////////////
// models/goals.js                M Jordan
/////////////////////////////////////////////////////////
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GoalsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  guser: {
    type: String,
    trim: true
  },
  goal: {
    type: String
  },
  category: {
    type: String
  },
  percent: {
    type: Number,
    default: 0
  },
  username:{
    type: String
  },
  description:{
    type: String
  },
  filename: {
    type: String
  },
  follow: {
    type: String
  }
});

// Create the Goals model with the GoalsSchema
var Goals = mongoose.model("Goals", GoalsSchema);

// Export the model
module.exports = Goals;