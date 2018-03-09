angular.module('RumiDashboard.controllers').controller('DashboardController', function($scope, $stateParams) {
    $scope.tagline = 'Welcome, ' + $stateParams.userId + '!';
});
