'use strict';

angular.module('issueTracker.dashboardCtrl', [])
    .controller('DashboardCtrl', [
        '$scope',
        'Identity',
        'Issues',
        function ($scope, identity, issues) {
            issues.getCurrentUserIssues(20, 1)
                .then(function (data) {
                    $scope.totalPages = data.TotalPages;
                    $scope.totalCount = data.TotalCount;
                    $scope.issues = data.Issues;
                });
            $scope.isAdmin = function () {
                return identity.isAdmin();
            }
        }
    ]);