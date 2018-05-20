/////////////////////////////////////////////////////////
// controllers/Controller.js                M Jordan
/////////////////////////////////////////////////////////
const db = require("../models");



// Defining methods for the Controller
var Controller = module.exports = {

  findAll: function(req, res) {
    //console.log("Controller: Im in find it all");
    db.Goals
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Goals
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByCategory: function(req, res) {
    console.log("findByCategory req "+req.params.category)
    db.Goals
      .find({category: (req.params.category).toString()})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    console.log("findByUser req "+req.params.user)
    db.Goals
      .find({username: (req.params.user).toString()})
      .sort({goal:1,date: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("create goals")
    console.log(res.body);
    db.Goals
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateGoalFollow: function(req, res) {
    // JSON.parse(req.body)
    console.log( JSON.stringify(req.body.username));
    console.log( JSON.stringify(req.body.follow));
    // console.log(JSON.parse(req.params))
    console.log( JSON.stringify(req.params));
    
    
    db.Goals
      .findOneAndUpdate({ username: req.body.username }, {follow: req.body.follow})
      .then(dbModel =>{ 
        res.json(dbModel)
        console.log("update successfu")})
      .catch(err => console.log(err));
  },
  update: function(req, res) {
    console.log("i made it here to update");
    console.log(req.body);
 /*   db.products.update(
   { _id: 100 },
   { $set: { "details.make": "zzz" } }
)*/
    db.Goals
      .findOneAndUpdate({ _id: req.body._id }, {percent: req.body.percent})
      .then(dbModel => {
        res.json(dbModel) 
        console.log("we updated database")} )
      .catch(err => console.log(err)) //res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Goals
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
