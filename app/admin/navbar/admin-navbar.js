'use strict';

angular.module('issueTracker.admin.navbar', [])
    .directive('adminNavbar', [
        function AdminNavbar() {
            return {
                templateUrl: 'app/admin/navbar/admin-navbar.html',
                link: [
            '$scope',
            '$element',
            '$attrs', 
            '$controller',
            '$location',
            function($scope, $element, $attrs, $controller, $location) {  //DOM manipulation
                $element.
                      
                $scope.users = function () {
                    $location.path('/users');
                }
        }]
            };
        }
    ]);