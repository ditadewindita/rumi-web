angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page (can be accessed by non-registered users)
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'RegisterController'
        })

        // login page that will use Login Controller
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        // register page that will use Register Controller
        .when('/register', {
          templateUrl: 'views/register.html'
          controller: 'RegisterController'
        })

        // dashboard (user home) page that will use Dashboard Controller,
        // user must be signed in to access
        .when('/dashboard', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardController',
          loginRequired: true
        })

        // redirect to home page if none of the above cases apply
        .otherwise({redirectTo: '/'})

    $locationProvider.html5Mode(true);

}]);
