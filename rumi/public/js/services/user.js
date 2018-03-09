angular.module('Rumi.services').service('UserService', function($rootScope) {

  var currUser;

  this.setUser = function(user) {
    currUser = user;
    $rootScope.$broadcast('userAdded');
  }

  this.getUser = function() {
    return currUser;
  }

});
