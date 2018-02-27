// angular.module('rumi', ['ngRoute', 'appRoutes', 'MainCtrl', 'UserCtrl', 'UserService']);
var app = angular.module("Rumi", ['ngRoute', 'appRoutes']);

// Services
app.factory('UserService', function($http) {

  return {
    isLogged: false,

    username: '',

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

    $scope.tagline = 'I love chicken!';

});


app.controller('LoginController', ['$scope', '$http', '$location', 'UserService',
  function($scope, $http, $location, User) {
    $scope.user = {
      'username' : '',
      'password' : ''
    };

    if($scope.user) {
      $scope.logUser = function(user) {
        // Call the user login function in the service and gather the response.
        // I have lots of superfluous data gathering on success/error but whatevs
          UserService.login($scope.user).then(function onSuccess(response) {
          // Handle success
          var data = response.data;
          var status = response.status;
          var statusText = response.statusText;
          var headers = response.headers;
          var config = response.config;
          // successful login -> isLogged is true and set username
          User.isLogged = true;
          User.username = data.username;
          $location.path('/dashboard');
        }).catch(function onError(response) {
          // Handle error
          var data = response.data;
          var status = response.status;
          var statusText = response.statusText;
          var headers = response.headers;
          var config = response.config;
          $scope.output = data;
          // unsuccessful login -> isLogged is false, username is empty
          User.isLogged = false;
          User.username = '';
        });
      };
    }
}]);

app.controller('RegisterController', function($scope, UserService) {

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

app.controller('DashboardController', function($scope, UserService) {

});

app.run(function($location, $rootScope) {
  var postLoginRoute;

  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    // if user is trying to access page where login is required but user is
    // logged out, redirect to login
    if (nextRoute.loginRequired && Account.loggedOut()) {
      postLoginRoute = $location.path();
      $location.path('/login').replace();
    }
    // if user is logged in, redirect to the post login route
    else if (postLogInRoute && Account.loggedIn()) {
      $location.path(postLogInRoute).replace();
      postLogInRoute = null;
    }
  });
});
