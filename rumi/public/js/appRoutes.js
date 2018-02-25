angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        })

        // users page that will use the UserController
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        });

    $locationProvider.html5Mode(true);

}]);
