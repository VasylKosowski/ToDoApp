/**
* Created by test on 4/19/16.
*/

'use strict';
app.controller('ItemsController', ['$scope', '$resource', 'credService',
    function($scope, $resource, credService) {
        $scope.category = {};
        $scope.category.userEmails = [];
        $scope.category.userEmails.push(credService.getEmail());
        $scope.categories = [];

        $scope.createCategory = function() {
            $resource('/api/categories/create').save($scope.category, function(response) {
                $scope.category.name = "";
                $scope.categories.push(response);
                $('#categoryModal').modal('hide');
                $scope.error = false;
            }, function(err){
                $('#categoryModal').modal('hide');
                $scope.error = err.statusText;
            });
        };

        $scope.updateCategory = function() {
            $resource('/api/categories/update').save($scope.category, function(response) {
                $('#updateCategoryModal').modal('hide');
                $scope.error = false;for (var i = 0; i < $scope.categories.length; i++) {
                    if ($scope.categories[i]._id === response.id) {
                        $scope.categories[i].name = response.name;
                        return;
                    }
                }
            }, function(err){
                $('#updateCategoryModal').modal('hide');
                $scope.error = err.statusText;
            });
        };

        $scope.deleteCategory = function() {
            $resource('/api/categories')
                .remove({ _id: $scope.category.id}, function() {
                    for (var i = 0; i < $scope.categories.length; i++) {
                        if ($scope.categories[i]._id === $scope.category.id) {
                            $scope.categories.splice(i, 1);
                            return;
                        }
                    }
                },function(err){
                    $('#categoryDeleteModal').modal('hide');
                    $scope.error = err.statusText;
                });
            $('#categoryDeleteModal').modal('hide');
        };

        $scope.getAllCategories = function() {
            $resource('/api/categories/getAllByEmail')
                .query({ email: $scope.category.userEmails[0]}, function(response) {
                    $scope.categories = $scope.categories.concat(response);
            },function(err){
                        $scope.error = err.statusText;
            });
        };

        $scope.categoryClick= function(id, params) {
            if (id != undefined) $scope.category.id = id;
            if (params != undefined) $scope.category.name = params.name;
        };

        $scope.shareCategory = function() {
            $('#categoryShareModal').modal('hide');
        };

        $scope.getAllCategories();
}]);