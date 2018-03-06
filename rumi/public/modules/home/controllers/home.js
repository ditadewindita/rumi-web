var home = angular.module('home', ['app', 'ui.router']);

home.config(function($stateProvider) {
    $stateProvider
        .state('main', {
            name: 'main',
            templateUrl: "main.html"
        })
});

home.controller('HomeController', ['$state', '$scope', 'UserService', function ($state, $scope, UserService) {
    $state.go('main');
}]);
