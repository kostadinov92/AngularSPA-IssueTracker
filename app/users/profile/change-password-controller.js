'use strict';

angular.module('issueTracker.users.profile.changePasswordCtrl', [])
    .controller('ChangePasswordCtrl', [
        '$scope',
        '$window',
        'Account',
        'toastr',
        function ChangePasswordCtrl($scope, $window, account, toastr) {
            $scope.changePassword = function () {
                account.changePassword({
                    oldPassword: $scope.oldPassword,
                    newPassword: $scope.newPassword,
                    confirmPassword: $scope.confirmPassword
                }).then(function (success) {
                    toastr.success('Password changed successfully.');
                    $window.history.back();
                }, function (error) {
                    console.log(error);
                });
            };
        }
    ]);