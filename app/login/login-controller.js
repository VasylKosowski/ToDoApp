/**
 * Created by test on 4/14/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[])
        .controller('LoginController', ['$scope', '$window', '$http', '$location',
        function($scope, $window, $http, $location) {
        $scope.error = false;
        $scope.user = {};
            
        $scope.onSignIn = function(googleUser) {
             var profile = googleUser.getBasicProfile();
             if (profile != undefined){
                 var email = profile.getEmail();
                 $scope.loginUser(email);
             }
        };

        $scope.loginUser = function(email){
            if (email != undefined){
                $scope.user.email = email;
                $scope.user.passwordNotRequired = true;
            } else {
                $scope.user.passwordNotRequired = false;
            }

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

        window.onSignIn = $scope.onSignIn;
    }]);
})();