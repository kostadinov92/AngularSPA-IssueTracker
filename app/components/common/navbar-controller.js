'use strict';

angular.module('issueTracker.navbarCtrl', [])
    .controller('navbarCtrl', [
        '$scope',
        '$location',
        'Authentication',
        'Identity',
        function ($scope, $location, authentication, identity) {
            $scope.logoutUser = function logoutUser() {
                authentication.logoutUser();
                $location.path('/');
            };
    }]);