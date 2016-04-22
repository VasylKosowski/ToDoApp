/**
 * Created by test on 4/22/16.
 */
angular.module('app').directive('deleteCategory', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/modals/_deleteCategory.html'
    }
}).directive('createCategory', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/modals/_createCategory.html'
    }
}).directive('updateCategory', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/modals/_updateCategory.html'
    }
});
