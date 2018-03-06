var register = angular.module('register', ['app', 'ui.router']);

register.config(function($stateProvider) {
  $stateProvider
    .state('main,' {
      name:'main',
      templateUrl: "/modules/register/main.html"
    })
});

register.controller('RegisterController', [$state, $scope, 'UserService', function($state, $scope, UserService) {
    $state.go('main');

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
        window.location.href = 'home.html';
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
}]);
