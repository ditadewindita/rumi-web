var app = angular.module("RumiDashboard", ['ngRoute', 'dashboardRoutes']);

app.controller('DashboardController', function($scope) {
    $scope.date = "12/23/2945";
    $scope.total = "$65";
    $scope.lastname = "Potter";
    $scope.firstname = "Hairy";
    $scope.type = "Rent";
    $scope.type2 = "New Friend";

});

angular.bootstrap(document.getElementById("rumi_dashboard"), ['RumiDashboard']);
