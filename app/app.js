/**
 * Created by test on 4/20/16.
 */

var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl : '/views/register.html',
            controller  : 'RegisterController'
        })
        .when('/items', {
            templateUrl : '/views/items.html',
            controller  : 'ItemsController'
        })
        .otherwise({
            templateUrl: '/views/login.html',
            controller: 'LoginController',
        });
});
