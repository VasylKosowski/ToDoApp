/**
 * Created by test on 4/14/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[]);

    app.controller('LoginController', ['$scope', '$http', '$window',
        function($scope, $http, $window) {
        $scope.error = false;

        $scope.login = function(){
            $http.post('/api/users/authenticate', $scope.user)
                .then(function(response) {
                    if (response.status == 200){
                        $scope.error = false;
                        $window.location.href = response.data.redirectUrl;
                    }
                })
                .catch(function(err){
                    $scope.error = err.statusText;
                });
        };
    }]);
})();

