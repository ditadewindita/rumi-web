angular.module('Rumi.controllers').controller('LoginController', function($scope, $location, $http, UserService) {
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
          var data = response.data;

          UserService.getDashboard(data);

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
