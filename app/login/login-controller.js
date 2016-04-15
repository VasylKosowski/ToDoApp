/**
 * Created by test on 4/14/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[])
        .controller('LoginController', ['$scope', '$window', '$http', '$location',
        function($scope, $window, $http, $location) {
        $scope.error = false;

        $scope.loginUser = function(){
            $http.post('/api/users/authenticate', $scope.user)
                .then(function(response) {
                    if (response.status == 200){
                        $scope.error = false;
                        $window.location.href = $location.absUrl().split('/login')[0] + '/items';
                    }
                })
                .catch(function(err){
                    $scope.error = err.statusText;
                });
        };
    }]);

})();

