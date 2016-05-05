'use strict';

angular.module('issueTracker.home.dashboardCtrl', [])
    .controller('DashboardCtrl', [
        '$scope',
        'Authentication',
        'Identity',
        'Issues',
        function ($scope, authentication, identity, issues) {
            
            issues.getCurrentUserIssues(20, 1)
                .then(function (data) {
                    $scope.totalPages = data.TotalPages;
                    $scope.totalCount = data.TotalCount;
                    $scope.issues = data.Issues;
                });            
            
        }
    ]);