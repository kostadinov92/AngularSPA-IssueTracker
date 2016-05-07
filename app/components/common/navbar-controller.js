'use strict';

angular.module('issueTracker.common.navbarCtrl', [])
    .controller('navbarCtrl', [
        '$scope',
        '$location',
        'Authentication',
        'Identity',
        function ($scope, $location, authentication, identity) {
            $scope.getUser = identity.getUser;

            $scope.logoutUser = function logoutUser() {
                authentication.logoutUser();
            };
            
    }]);