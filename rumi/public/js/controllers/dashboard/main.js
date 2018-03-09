angular.module('RumiDashboard.controllers').controller('DashboardController', function($scope, UserService) {
  $scope.$on('userAdded', function() {
    $scope.user = UserService.getUser();
  });

  $scope.date = "12/23/2945";
  $scope.total = "$65";
  $scope.lastname = "Potter";
  $scope.firstname = "Hairy";
  $scope.type = "Rent";
  $scope.type2 = "New Friend";
});
