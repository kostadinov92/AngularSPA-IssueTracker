'use strict';

angular.module('issueTracker.home.homeCtrl', [])
    
    .controller('HomeCtrl', [
        '$scope',
        'Authentication',
        function ($scope, authentication) {            

            $scope.isAuthenticated = function () {
                return authentication.isAuthenticated();
            };

            $scope.isAdmin = function () {
                return identity.isAdmin();
            };
        }]);