/**
* Created by test on 4/14/16.
*/
'use strict';
app.controller('LoginController', ['$scope', '$window', '$resource', '$location', 'credService',
    function($scope, $window, $resource, $location, credService) {
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

        $resource('/api/users/authenticate').save($scope.user, function() {
            $scope.error = false;
            credService.setEmail($scope.user.email);
            $location.path('/items');
        }, function(err) {
            $scope.error = err.statusText;
        });
    };

    window.onGoogleLogin = $scope.onGoogleLogin;
    window.onFbLogin = $scope.onFbLogin;

    // render google and facebook sign in buttons
    renderButton();
    fbAsyncInit();
}]);
