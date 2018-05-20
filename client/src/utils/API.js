/////////////////////////////////////////////////////////
// client/src/utils/API.js                M Jordan
/////////////////////////////////////////////////////////
import axios from "axios";

export default {
  signup: function () {
    return axios.get('/signup');
  },

  login: function () {
    return axios.get('/login');
  },

  submitSignup: function (userInfo) {
    // this will respond with error if there was an error
    // or respond with registered if registered.
    console.log("submit" + userInfo)
    return axios.post('/signup', userInfo)
      .then(function (response) {
        console.log("api" + response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        console.log("error1")
      });
  },
  submitLogin: function (LoginInfo) {
    return axios.post('/login', LoginInfo)
      .then(function (response) {
        console.log(response);
        console.log('hitting login');
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        console.log('error at login');
      });
  },
  Logout: function (LoginInfo) {
    return axios.get('/logout')
      .then(function (response) {
        console.log(response);
        console.log('hitting logout');
      })
      .catch(function (error) {
        console.log(error);
        console.log('error at logout');
      });
  },
  // Gets all goals
  getGoals: function(params) {
    console.log("API getGoals axios.GET(/api/goals ")
    axios.get("/api/goals")
      .then(data => {
        console.log(data)
        return data
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header)
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      });
  },
  // Gets the goal with the given id
  getGoal: function(id) {
    console.log("API axios.GET(/api/goal/"+id)
    return axios.get("/api/goals/" + id);
  },
  getGoalsCategory: function(category) {
    console.log("API axios.GET(/api/goals/category/" + category);
    return axios.get("/api/goals/category/"+category)
  /* .then(data => {
        console.log(data)
        return data
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header)
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error getGoalsCategory ", err.message);
        }
      });*/
  },
    // Gets the goals with the given user
  getGoalsUser: function(user) {
    console.log("API axios.GET(/api/goals/user/" + user);
     return axios.get("/api/goals/user/" + user)
  /*   .then(function (response) {
     
    .catch(function (error) {
      console.log(error);
      console.log('error at get goaluser');
    });*/
  },

  // Deletes the goal with the given id
  deleteGoal: function(id) {
    console.log("API axios.DELETE(/api/goals/"+id)
    return axios.delete("/api/goals/" + id);
  },
  // Saves a goal to the database
  saveGoal: function(goalData) {
    console.log("API axios.POST(/api/goals/user")
    console.log("goalData "+JSON.stringify(goalData))

    return axios.post("/api/goals/user/",goalData);
  },
  // Saves a goal to the database
  updateGoal: function(percentData) {
    console.log("API axios.POST(/api/goals/")
    //console.log("goalData "+JSON.stringify(goalData))
    console.log(percentData)
    return axios.post("/api/goals/update/", percentData);

    // return axios.post("/api/goals/user/", goalData);
  },
  followOthersGoal: function(_id){
    console.log("following others goal in api")
    return axios.post("/api/goals/follow/",_id)

  }


};
