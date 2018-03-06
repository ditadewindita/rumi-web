// angular.module('rumi', ['ngRoute', 'appRoutes', 'MainCtrl', 'UserCtrl', 'UserService']);
var app = angular.module("Rumi", ['ngRoute', 'appRoutes']);

// Services
app.factory('UserService', function($http) {

  return {
    // call to GET all users
    get : function() {
      return $http.get('/api/users');
    },

    // call to POST and create a new user
    create : function(user) {
      return $http.post('/api/createUser', user);
    },

    // call to POST and login a user
    login : function(user) {
      console.log("In login user");
      return $http.post('/api/loginUser', user);
    },

    // call to DELETE a user
    delete : function(id) {
      return $http.delete('/api/users/' + id);
    }
  }
});
