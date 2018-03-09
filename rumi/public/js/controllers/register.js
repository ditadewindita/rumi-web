angular.module('Rumi.controllers').controller('RegisterController', function($scope, AuthenticationService) {
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
      AuthenticationService.register($scope.user).then(function onSuccess(response) {
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
