angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: '../views/index.html',
            controller: 'MainController'
        })

        // users page that will use the UserController
        .when('/login', {
            templateUrl: '../views/login/index.html',
            controller: 'LoginController'
        })

        .when('/register', {
            templateUrl: '../views/register/index.html',
            controller: 'RegisterController'
        })

        .when('/dashboard', {
            templateUrl: '../views/dashboard/index.html',
            controller: 'DashboardController'
        })

        ;

    $locationProvider.html5Mode(true);

}]);
