'use strict';

angular.module('issueTracker.home.registrationCtrl', [])
    .controller('RegistrationCtrl', [
        '$scope',
        '$route',
        'Authentication',
        'toastr',
        function ($scope, $route, authentication, toastr) {
            
            $scope.loginInput = {};
            $scope.registerInput = {};

            $scope.loginUser = function () {
                authentication.loginUser({
                        email: $scope.loginInput.email,
                        password: $scope.loginInput.password
                    })
                    .then(function (success) {
                        toastr.success('Login successful.');
                        $route.reload();
                    });
            };

            $scope.registerUser = function () {
                var email = $scope.registerInput.email;
                var password = $scope.registerInput.password;

                authentication.registerUser({
                        email: $scope.registerInput.email,
                        password: $scope.registerInput.password,
                        confirmPassword: $scope.registerInput.confirmPassword
                    })
                    .then(function (success) {
                        toastr.success('Register successful.');
                        authentication.loginUser({
                                email: email,
                                password: password
                            })
                            .then(function (success) {
                                $route.reload();
                                console.log(success);
                            });
                        console.log(success);
                    });
            };
        }
    ]);