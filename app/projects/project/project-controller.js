'use strict';

angular.module('issueTracker.projects.project.projectController', [])
    .controller('ProjectCtrl', [
        '$scope',
        '$routeParams',
        'Identity',
        'Projects',
        'Issues',
        'toastr',
        function ($scope, $routeParams, identity, projects, issues, toastr) {
            var projectId = $routeParams.projectId;

            $scope.project = {};
            
            $scope.user = identity.getUser;

            $scope.editProject = function () {

                var edited = $scope.project;
                edited.LeadId = $scope.project.Lead.Id;

                projects.editProject(edited)
                    .then(function (response) {
                        toastr.success('The project "' + response.Name +'" was edited successfully.');
                        console.log(response);
                    });
            };

            projects.getProjectById(projectId)
                .then(function (response) {
                    $scope.project = response;
                    console.log(response);
                });

            issues.getIssuesByProjectId(projectId)
                .then(function (success) {
                    $scope.project.issues = success;
                });
        }
    ]);