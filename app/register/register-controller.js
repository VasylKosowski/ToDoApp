/**
* Created by test on 4/15/16.
*/

'use strict';
app.controller('RegisterController', ['$scope', '$window', '$resource', '$location',
    function($scope, $window, $resource, $location) {
        $scope.error = false;

        $scope.registerUser = function(){
            $resource('/api/users/register').save($scope.user, function() {
                $scope.error = false;
                $location.path('/login');
            }, function(err) {
                $scope.error = err.statusText;
            });
        };
}]);