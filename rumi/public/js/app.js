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
    create : function(userData) {
      return $http.post('/api/users', userData);
    },

    // call to DELETE a user
    delete : function(id) {
      return $http.delete('/api/users/' + id);
    }
  }
});

// Controllers
app.controller('MainController', function($scope) {

    $scope.tagline = 'I love chicken!';

});


app.controller('UserController', function($scope, UserService) {

    $scope.tagline = 'Welcome, earthling.';

    // when the createUser() function is called, gather the form fields
    // and pass it to the service, and define the JSON to pass:
    $scope.user = {
      'firstName' : '',
      'lastName' : '',
      'email' : '',
      'username' : '',
      'password' : ''
    };

    // Create the user only if the inputs are valid!
    if($scope.user) {
      $scope.createUser = function(user) {

        // Call the user creation function in the service and gather the response.
        // I have lots of superfluous data gathering on success/error but whatevs
        UserService.create($scope.user).then(function onSuccess(response) {
        // Handle success
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        $scope.output = data;

      }).catch(function onError(response) {
        // Handle error
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        $scope.output = data;
      });
    };
  }
});
