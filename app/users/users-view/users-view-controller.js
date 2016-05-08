'use strict';

angular.module('issueTracker.users.usersView.usersViewCtrl', [])
    .controller('UsersViewCtrl', [
        '$scope',
        'Users',
        'toastr',
        function ($scope, users, toastr) {
            $scope.search = {username: ''};

            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });

            $scope.refreshData = function () {
                users.getUsersByFilter($scope.search.username)
                    .then(function (data) {
                        $scope.users = data;
                    });
            };

            $scope.makeAdmin = function (id, username) {
                users.makeAdmin(id)
                    .then(function (success) {
                        $scope.refreshData();
                        toastr.success('The user ' + username + ' is now administrator.');
                    });
            };


        }
    ]);