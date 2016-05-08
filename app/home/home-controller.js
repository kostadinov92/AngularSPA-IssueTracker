'use strict';

angular.module('issueTracker.home.homeCtrl', [])
    
    .controller('HomeCtrl', [
        '$scope',
        'Authentication',
        'Identity',
        function ($scope, authentication, identity) {

            $scope.isAuthenticated = function () {
                return authentication.isAuthenticated();
            };

            $scope.isAdmin = function () {
                return identity.isAdmin();
            };
        }]);