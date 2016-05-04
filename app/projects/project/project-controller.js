'use strict';

angular.module('issueTracker.projects.projectController', [])
    .controller('ProjectCtrl', [
        '$scope',
        '$routeParams',
        'Projects',
        'Issues',
        function ($scope, $routeParams, projects, issues) {
            var projectId = $routeParams.projectId;
            projects.getProjectById(projectId)
                .then(function (success) {
                    $scope.project = success;
                    console.log(success);
                });

            issues.getIssuesByProjectId(projectId)
                .then(function (success) {
                    $scope.project.issues = success;
                    console.log(success);
                });
        }
    ]);