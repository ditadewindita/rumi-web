angular.module('RumiDashboard', ['ui.router', 'RumiDashboard.controllers', 'Rumi.services']).config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('dashboard', {
      url : '/dashboard',
      templateUrl: '../views/dashboard/main.html',
      controller: 'DashboardController'
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/dashboard');
});

angular.bootstrap(document.getElementById('rumi_dashboard'), ['RumiDashboard']);
