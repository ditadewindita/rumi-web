angular.module('Rumi', ['ui.router', 'Rumi.services', 'Rumi.controllers']).config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url : '/',
      templateUrl : '../views/index.html',
      controller : 'MainController'
    })
    .state('login', {
      url : '/login',
      templateUrl: '../views/login/index.html',
      controller: 'LoginController'
    })
    .state('register', {
      url : '/register',
      templateUrl: '../views/register/index.html',
      controller: 'RegisterController'
    })
    .state('dashboard', {
      url : '/dashboard',
      templateUrl: '../views/dashboard/index.html',
      params : {
        userId : null
      },
      controller: 'DashboardController'
    });

    $locationProvider.html5Mode(true);
});
