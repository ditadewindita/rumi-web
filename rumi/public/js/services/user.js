// angular.module("Rumi", ['ngRoute', 'appRoutes']).factory('UserService', function($http) {
//
//   return {
//     // call to GET all users
//     getDashboard : function(token) {
//       return $http.get('/api/getDashboard/' + JSON.stringify(token));
//     },
//
//     // call to POST and create a new user
//     create : function(userData) {
//       return $http.post('/api/createUser', userData);
//     },
//
//     // call to POST and login a user
//     login : function(userData) {
//       return $http.post('/api/loginUser', userData);
//     },
//     //
//     // // call to DELETE a user
//     // delete : function(id) {
//     //   return $http.delete('/api/users/' + id);
//     // }
//   }
// });

angular.module('Rumi.services').service('UserService', function($http) {

  return {
    // call to GET all users
    getDashboard : function(token) {
      return $http.get('/api/getDashboard/' + JSON.stringify(token));
    },

    // call to POST and create a new user
    create : function(userData) {
      return $http.post('/api/createUser', userData);
    },

    // call to POST and login a user
    login : function(userData) {
      return $http.post('/api/loginUser', userData);
    },
    //
    // // call to DELETE a user
    // delete : function(id) {
    //   return $http.delete('/api/users/' + id);
    // }
  }
});
