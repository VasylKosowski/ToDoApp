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
                $scope.category = {};
                $scope.categories.push(response);
                $('#categoryModal').modal('hide');
                $scope.error = false;
            }, function(err){
                $scope.error = err.statusText;
            });
        };

        $scope.deleteCategory = function() {
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

        $scope.getAllCategories();
}])
.directive('deleteCategory', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/modals/_deleteCategory.html'
        }
}).directive('createCategory', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/modals/_createCategory.html'
    }
});