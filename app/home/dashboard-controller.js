'use strict';

angular.module('issueTracker.home.dashboardCtrl', [])
    .controller('DashboardCtrl', [
        '$scope',
        'Authentication',
        'Identity',
        'Projects',
        'Issues',
        function ($scope, authentication, identity, projects, issues) {
            
            issues.getUserIssues(20, 1)
                .then(function (data) {
                    $scope.totalPages = data.TotalPages;
                    $scope.totalCount = data.TotalCount;
                    $scope.issues = data.Issues;
                });
            
            projects.getUserRelatedProjects(20, 1)
                .then(function (data) {
                    $scope.userProjects = data.Projects;
                });
        }
    ]);