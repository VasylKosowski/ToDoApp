/**
 * Created by test on 4/19/16.
 */
(function () {
    'use strict';

    var app = angular.module('app',[])
        .controller('ItemsController', ['$scope', '$http',
            function($scope, $http) {

                $scope.createCategory = function() {
                    alert('Create Category');
                };

            }]);
})();