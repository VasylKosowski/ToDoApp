/**
 * Created by test on 4/14/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[]);

    app.controller('LoginController', ['$scope', '$http', function($scope, $http) {
        $scope.error = false;
        
        /*$http.get('/login').success(function(){

        });*/

        /*$http.post('/login', data).fail(function(res){
            $scope.error = true;
        });*/

    }]);

})();

