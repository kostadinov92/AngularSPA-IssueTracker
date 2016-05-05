'use strict';

angular.module('issueTracker.projects.projectController', [])
    .controller('ProjectCtrl', [
        '$scope',
        '$routeParams',
        'Identity',
        'Projects',
        'Issues',
        function ($scope, $routeParams, identity, projects, issues) {
            var projectId = $routeParams.projectId;

            $scope.project = {};
            
            $scope.user = {
                get: identity.getUser
            };



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