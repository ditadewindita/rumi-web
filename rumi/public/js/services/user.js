angular.module('Rumi.services').service('UserService', function($http) {

  return {

    getDashboard : function(token) {
      return $http.get('/api/auth/me', {
        headers: {'x-access-token': token }
      });
    },

    register : function(userData) {
      return $http.post('/api/auth/register', userData);
    },

    login : function(userData) {
      return $http.post('/api/auth/login', userData);
    }
  }
});
