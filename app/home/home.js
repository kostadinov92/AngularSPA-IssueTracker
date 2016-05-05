'use strict';

angular.module('issueTracker.home', [])
    
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'Authentication',
        'toastr',
        function ($scope, $location, authentication, toastr) {
            $scope.loginUser = function () {
                authentication.loginUser({
                    email: $scope.login.email,
                    password: $scope.login.password
                })
                    .then(function (success) {
                        toastr.success('Login successful.');
                        $location.path('/dashboard');
                    }, function (error) {
                        console.log(error);
                    });
            };

            $scope.registerUser = function () {
                var email = $scope.register.email;
                var password = $scope.register.password;

                authentication.registerUser({
                    email: $scope.register.email,
                    password: $scope.register.password,
                    confirmPassword: $scope.register.confirmPassword
                })
                    .then(function (success) {
                        toastr.success('Register successful.');
                        authentication.loginUser({
                                email: email,
                                password: password
                            })
                            .then(function (success) {
                                $location.path('/dashboard');
                                console.log(success);
                            }, function (error) {
                                console.log(error);
                            });
                        console.log(success);
                    }, function (error) {
                        console.log(error);
                });
            };

            $scope.isAuthenticated = function () {
                return authentication.isAuthenticated;
            };
        }]);