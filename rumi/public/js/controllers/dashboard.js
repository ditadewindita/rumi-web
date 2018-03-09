angular.module('Rumi.controllers').controller('DashboardController', function($scope, $stateParams) {
    $scope.tagline = 'Welcome, ' + $stateParams.userId + '!';
});
