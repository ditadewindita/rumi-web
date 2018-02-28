angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: '../modules/home/main.html',
            resolve: resolveController('../modules/home/home.js')
        })

        // login page
        .when('/login', {
            templateUrl: '../modules/login/main.html',
            resolve: resolveController('../modules/login/login.js')
        })

        // register page
        .when('/register', {
            templateUrl: '../modules/register/main.html',
            resolve: resolveController('../modules/register/register.js')
        })

        // dashboard page (for users that are signed in)
        .when('/dashboard', {
            templateUrl: '../modules/dashboard/main.html',
            resolve: resolveController('../modules/dashboard/dashboard.js')
        });

    $locationProvider.html5Mode(true);

}]);
