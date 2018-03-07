angular.module('dashboardRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/dashboard', {
            templateUrl: '../views/dashboard/index.html',
            controller: 'DashboardController'
        });

    $locationProvider.html5Mode(true);

}]);
