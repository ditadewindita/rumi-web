var login = angular.module('login', ['app', 'ui.router']);

login.config(function($stateProvider) {
  $stateProvider
    .state('main', {
      name: 'main',
      templateUrl: "main.html",
    })
});

login.controller('LoginController', ['$state', '$scope', '$http', 'UserService', function($state, $scope, UserService) {
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
          $scope.output = data;
          window.location.href = '../home/home.html';
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

    $state.go('main');
}]);
