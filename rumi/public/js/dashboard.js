angular.module('RumiDashboard', ['ui.router', 'RumiDashboard.controllers']).config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('dashboard', {
      url : '/dashboard',
      templateUrl: '../views/dashboard/main.html',
      params : {
        userId : null
      },
      controller: 'DashboardController'
    });

    $locationProvider.html5Mode(true);
});

angular.bootstrap(document.getElementById("rumi_dashboard"), ['RumiDashboard']);
