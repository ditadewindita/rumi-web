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
      return $http.post('/api/createUser', userData);
    },

    // call to POST and login a user
    login : function(userData) {
      return $http.post('/api/loginUser', userData);
    },

    // call to DELETE a user
    delete : function(id) {
      return $http.delete('/api/users/' + id);
    }
  }
});

// Controllers
app.controller('MainController', function($scope) {
    $scope.tagline = 'Never get jipped by your roommates again.';
});

app.controller('LoginController', function($scope, $location, $http, UserService) {
  var usernameField = angular.element(document.querySelector('#inputUsername'));
  var passwordField = angular.element(document.querySelector('#inputPassword'));

  $scope.tagline = 'Welcome back!';
  $scope.desc = 'Enter your login information below.';
  $scope.message = false;

  $scope.user = {
    'username' : '',
    'password' : ''
  };

  if($scope.user) {
    $scope.logUser = function(user) {
      // Call the user creation function in the service and gather the response.
      // I have lots of superfluous data gathering on success/error but whatevs
        UserService.login($scope.user).then(function onSuccess(response) {
          $scope.message = 'Logged in!';
          usernameField.removeClass('is-invalid');
          passwordField.removeClass('is-invalid');
          // sessionStorage.

          // // Handle success
          // var data = response.data;
          // var status = response.status;
          // var statusText = response.statusText;
          // var headers = response.headers;
          // var config = response.config;

          // $scope.output = data;
          // $scope.output2 = headers;
          // $http.get('/dashboard', response.data);
          // $location.url('../dashboard');

          // $window.location.href = '/dashboard';

      }).catch(function onError(response) {
        // Handle error
        var message = response.data.message;
        var code = response.data.code;

        // Reset error visuals
        $scope.message = false;
        usernameField.removeClass('is-invalid');
        passwordField.removeClass('is-invalid');

        // Set error visuals based on error
        if(code == 1)
        usernameField.addClass('is-invalid');
        else if(code == 2)
        passwordField.addClass('is-invalid');

        // Show error message
        $scope.message = message;
      });
    };
  }
});

app.controller('RegisterController', function($scope, UserService) {
  var usernameField = angular.element(document.querySelector('#inputUsername'));
  var emailField = angular.element(document.querySelector('#inputEmail'));

  $scope.tagline = 'Welcome to Rumi!';
  $scope.desc = 'Fill out the fields below to get started.';
  $scope.message = false;

  // when the createUser() function is called, gather the form fields
  // and pass it to the service, and define the JSON to pass:
  $scope.user = {
    'firstName' : '',
    'lastName' : '',
    'email' : '',
    'username' : '',
    'password' : ''
  };

  if($scope.user) {
    $scope.createUser = function(user) {

      // Call the user creation function in the service and gather the response.
      UserService.create($scope.user).then(function onSuccess(response) {
        $scope.message = 'Created account!';
        emailField.removeClass('is-invalid');
        usernameField.removeClass('is-invalid');

        // // Handle success
        // var data = response.data;
        // var status = response.status;
        // var statusText = response.statusText;
        // var headers = response.headers;
        // var config = response.config;
      }).catch(function onError(response) {
        var message = response.data.message;
        var code = response.data.code;

        // Reset error visuals
        $scope.message = false;
        emailField.removeClass('is-invalid');
        usernameField.removeClass('is-invalid');

        // Set error visuals based on error
        if(code == 1)
          emailField.addClass('is-invalid');
        else if(code == 2)
          usernameField.addClass('is-invalid');

        // Show error message
        $scope.message = message;
      });
    };
  }
});
