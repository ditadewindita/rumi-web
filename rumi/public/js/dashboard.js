angular.module('RumiDashboard', ['ui.router', 'RumiDashboard.controllers', 'Rumi.services']).config(function($stateProvider, $locationProvider, $urlRouterProvider) {

<<<<<<< HEAD
  $stateProvider
    .state('dashboard', {
      url : '/dashboard',
      templateUrl: '../views/dashboard/main.html',
      controller: 'DashboardController'
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/dashboard');
=======
app.controller('DashboardController', function($scope) {
    $scope.date = "12/23/2945";
    $scope.total = "$65";
    $scope.lastname = "Potter";
    $scope.firstname = "Hairy";
    $scope.type = "Rent";
    $scope.type2 = "New Friend";

>>>>>>> c92bdbbc81be5fd72e43593b26006c9b2dac0979
});

angular.bootstrap(document.getElementById('rumi_dashboard'), ['RumiDashboard']);
