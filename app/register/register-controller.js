/**
 * Created by test on 4/15/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[])
        .controller('RegisterController', ['$scope', '$window', '$http', '$location',
            function($scope, $window, $http, $location) {
                $scope.error = false;

                $scope.registerUser = function(){
                    $http.post('/api/users/register', $scope.user)
                        .then(function(response) {
                            if (response.status == 200){
                                $scope.error = false;
                                $window.location.href = $location.absUrl().split('/register')[0] + '/login';
                            }
                        })
                        .catch(function(err){
                            $scope.error = err.statusText;
                        });
                };
            }]);

})();