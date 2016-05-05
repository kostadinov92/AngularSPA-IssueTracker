'use strict';

angular.module('issueTracker.users.profile.changePasswordCtrl', [])
    .controller('ChangePasswordCtrl', [
        '$scope',
        'Account',
        'toastr',
        function ChangePasswordCtrl($scope, account, toastr) {
            $scope.changePassword = function () {
                account.changePassword({
                    oldPassword: $scope.oldPassword,
                    newPassword: $scope.newPassword,
                    confirmPassword: $scope.confirmPassword
                }).then(function (success) {
                    toastr.success('Password changed successfully.');
                }, function (error) {
                    console.log(error);
                });
            };
        }
    ]);