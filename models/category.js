/////////////////////////////////////////////////////////
// models/goals.js                M Jordan
/////////////////////////////////////////////////////////
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CatSchema = new Schema({
  catDesc:{
    type: String
  }
});

// Create the Goals model with the GoalsSchema
var Categories = mongoose.model("Categories", CatSchema);

// Export the model
module.exports = Categories;