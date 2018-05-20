const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// inserts below

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/progressiondb"
);

const goalsSeed = [
/*  {
    date:  '2018/03/01 08:00',
    goalNum: 1, 
    guser: 'Mary',
    goal: 'increase water',
    description: 'increase water',
    category: 'Health',
    percent: 0,
    username: "Mary",
    filename: "",
    follow: "Angela"
  },
  {
    date:  '2018/03/03 09:00',
    goalNum: 1, 
    guser: 'Mary',
    goal: 'increase water',
    description: 'increase water',
    category: 'Health',
    percent: 2,
    username: "Mary",
    filename: "",
    follow: "Angela"
  },*/
  {
    date:  '2018/03/05 11:00',
    goalNum: 1,  
    guser: 'Mary',
    goal: 'increase water',
    description: 'increase water',
    category: 'Health',
    percent: 4,
    username: "Mary",
    filename: "",
    follow: "Angela"
  },
  {
    date:  '2018/03/06 9:30',
    goalNum: 2, 
    guser: 'Mary',
    goal: 'Walk 5 miles',
    description: 'Walk 5 miles',
    category: 'Fitness',
    percent: 6,
    username: "Mary",
    filename: ""
  },
  {
    date:  '2018/04/01 08:00', 
    goalNum: 3, 
    guser: 'Angela',
    goal: 'More water!',
    description: 'More water!',
    category: 'Health',
    percent: 0,
    username: "Angela",
    filename: "",
    follow: "Mary"
  },
  /*
  {
    date:  '2018/04/03 09:00',
    goalNum: 4, 
    guser: 'Angela',
    goal: 'increase daily exercise!',
    description: 'increase daily exercise!',
    category: 'Fitness',
    percent: 3,
    username: "Angela",
    filename: ""
  },
  {
    date:  '2018/04/05 11:00',
    goalNum: 4,  
    guser: 'Angela',
    goal: 'increase daily exercise!',
    description: 'increase daily exercise!',
    category: 'Fitness',
    percent: 5,
    username: "Angela",
    filename: ""
  },
  */
  {
    date:  '2018/04/06 9:30',
    goalNum: 4, 
    guser: 'Angela',
    goal: 'increase daily exercise!',
    description: 'increase daily exercise!',
    category: 'Fitness',
    percent: 7,
    username: "Angela",
    filename: ""
  },
  {
    date:  '2018/04/15 9:30',
    goalNum: 5, 
    guser: 'Mary',
    goal: 'swimming!',
    description: 'swimming!',
    category: 'Fitness',
    percent: 7,
    username: "Mary",
    filename: ""
  }
];

const CategoriesSeed = [
  {
    catDesc: 'Health'
  },
  {
    catDesc: 'Fitness'
  },
  {
    catDesc: 'Home'
  },
  {
    catDesc: 'Hobbies'
  },
  {
    catDesc: 'Social'
  },
  {
    catDesc: 'Efficiency'
  }
];

db.Goals
  .remove({})
  .then(() => db.Goals.collection.insertMany(goalsSeed))
  .then(data => {
    console.log("Goal records inserted!");
    //process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


db.Categories
  .remove({})
  .then(() => db.Categories.collection.insertMany(CategoriesSeed))
  .then(data => {
    console.log("Categories records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
