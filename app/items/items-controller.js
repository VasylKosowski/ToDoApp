/**
* Created by test on 4/19/16.
*/

'use strict';
app.controller('ItemsController', ['$scope', '$http', 'credService',
    function($scope, $http, credService) {
        $scope.category = {};
        $scope.category.userEmails = [];
        $scope.category.userEmails.push(credService.getEmail());
        $scope.categories = [];

        $scope.createCategory = function() {
            $http.post('/api/categories/create', $scope.category)
                .then(function(response) {
                    if (response.status == 200){
                        $scope.categories.push(response.data);
                        $('#categoryModal').modal('hide');
                        $scope.error = false;
                    }
                })
                .catch(function(err){
                    $scope.error = err.statusText;
                });
        };

        $scope.getAllCategories = function() {
            var config = {
                params: { email: $scope.category.userEmails[0]},
                headers : {'Accept' : 'application/json'}
            };

            $http.get('/api/categories/getAllByEmail', config)
                .then(function (response){
                    if (response.status == 200){
                        $scope.categories = response.data;
                    }
                })
                .catch(function(err){
                    $scope.error = err.statusText;
                });
        };

        $scope.getAllCategories();
}]);