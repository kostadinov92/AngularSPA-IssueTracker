'use strict';

angular.module('issueTracker.home', [])
    
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'Authentication',
        function ($scope, $location, authentication) {
            $scope.loginUser = function () {
                authentication.loginUser({
                    email: $scope.login.email,
                    password: $scope.login.password
                })
                    .then(function (success) {
                        $location.path('/dashboard');
                    }, function (error) {

                    });
            };

            $scope.registerUser = function () {
                authentication.registerUser();
            };

            $scope.isAuthenticated = function () {
                return authentication.isAuthenticated;
            };
        }]);