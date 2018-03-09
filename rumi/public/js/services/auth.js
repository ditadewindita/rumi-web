angular.module('Rumi.services').service('AuthenticationService', function($http) {

  this.setUser = function(token) {
    return $http.get('/api/auth/me', {
      headers: {'x-access-token': token }
    });
  }
  //
  // this.getUser = function() {
  //   return currUser;
  // }

  this.register = function(userData) {
    return $http.post('/api/auth/register', userData);
  }

  this.login = function(userData) {
    return $http.post('/api/auth/login', userData);
  }

});
