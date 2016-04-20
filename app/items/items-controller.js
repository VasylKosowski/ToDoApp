/**
 * Created by test on 4/19/16.
 */
(function () {
    'use strict';

    app.controller('ItemsController', ['$scope', '$http', 'credService',
            function($scope, $http, credService) {
                $scope.category = {};
                $scope.category.userEmail = credService.getEmail();

                $scope.createCategory = function() {
                    $http.post('/api/categories/create', $scope.category)
                        .then(function(response) {
                            if (response.status == 200){
                                $scope.error = false;
                            }
                        })
                        .catch(function(err){
                            $scope.error = err.statusText;
                        });
                };
            }]);
})();
