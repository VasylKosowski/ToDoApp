/**
* Created by test on 4/15/16.
*/

'use strict';
app.controller('RegisterController', ['$scope', '$window', '$http', '$location',
    function($scope, $window, $http, $location) {
        $scope.error = false;

        $scope.registerUser = function(){
            $http.post('/api/users/register', $scope.user)
                .then(function(response) {
                    if (response.status == 200){
                        $scope.error = false;
                        $location.path('/login');
                    }
                })
                .catch(function(err){
                    $scope.error = err.statusText;
                });
        };
}]);