var app = angular.module("RumiDashboard", ['ngRoute', 'dashboardRoutes']);

app.controller('DashboardController', function($scope) {
  $scope.message = 'Welcome!';
});

angular.bootstrap(document.getElementById("App2"), ['RumiDashboard']);
