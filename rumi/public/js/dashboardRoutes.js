angular.module('dashboardRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/dashboard', {
            templateUrl: '../views/dashboard/main.html',
            controller: 'DashboardController'
        });

    $locationProvider.html5Mode(true);

}]);
