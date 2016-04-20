/**
* Created by test on 4/14/16.
*/
'use strict';
app.controller('LoginController', ['$scope', '$window', '$http', '$location', 'credService',
    function($scope, $window, $http, $location, credService) {
    $scope.error = false;
    $scope.user = {};

    $scope.onGoogleLogin = function(googleUser) {
         var profile = googleUser.getBasicProfile();
         if (profile != undefined){
             var email = profile.getEmail();
             $scope.loginUser(email);
         }
    };

    $scope.onFbLogin = function(response) {
        if (response.status == 'connected') {
            FB.api('/me', { locale: 'en_US', fields: 'name, email' }, function(userInfo) {
                $scope.loginUser(userInfo.email);
            });
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
                    credService.setEmail($scope.user.email);
                    $location.path('/items');
                }
            })
            .catch(function(err){
                $scope.error = err.statusText;
            });
    };

    window.onGoogleLogin = $scope.onGoogleLogin;
    window.onFbLogin = $scope.onFbLogin;
}]);
