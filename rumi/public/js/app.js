angular.module('Rumi', ['ui.router', 'Rumi.services', 'Rumi.controllers']).config(function($stateProvider, $locationProvider, $urlRouterProvider) {

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
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
