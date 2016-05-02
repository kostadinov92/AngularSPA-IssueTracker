'use strict';

angular.module('issueTracker.navbarCtrl', [])
    .controller('navbarCtrl', [
        '$scope',
        '$location',
        'Authentication',
        function ($scope, $location, authentication) {
            $scope.logoutUser = function logoutUser() {
                authentication.logoutUser();
                $location.path('/');
            };
    }]);