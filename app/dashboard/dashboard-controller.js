'use strict';

angular.module('issueTracker.dashboardCtrl', [])
    .controller('DashboardCtrl', [
        '$scope',
        'Issues',
        function ($scope, issues) {
            issues.getCurrentUserIssues(5, 1)
                .then(function (data) {
                    $scope.totalPages = data.TotalPages;
                    $scope.totalCount = data.TotalCount;
                    $scope.issues = data.Issues;
                });
            
        }
    ]);