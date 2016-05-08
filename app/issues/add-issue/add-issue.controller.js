'use strict';

'use strict';

angular.module('issueTracker.issues.addIssue.addIssueController', [])
    .controller('AddIssueCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        '$window',
        'Projects',
        'Issues',
        'Users',
        'Labels',
        'toastr',
        function ($scope, $routeParams, $location, $window, projects, issues, users, labels, toastr) {
            $scope.projectId = $routeParams.projectId;
            $scope.issueToPost = {Labels: []};
            $scope.users = [];
            $scope.search = {user: '', label: '', labelSuggestions: []};

            projects.getProjectById($scope.projectId)
                .then(function (data) {
                    $scope.project = data;
                    console.log($scope.project);
                });

            $scope.loadUsersByFilter = function () {
                if($scope.search.user.length < 2){
                    return;
                }
                users.getUsersByFilter($scope.search.user)
                    .then(function (data) {
                        $scope.users = data;
                    });
            };

            $scope.loadAllUsers = function () {
                users.getAllUsers()
                    .then(function (data) {
                        $scope.users = data;
                    });
            };

            $scope.postNewIssue = function () {
                var dueDate =
                        $scope.input.DueDate.getFullYear() +
                        '/' + ($scope.input.DueDate.getMonth() + 1) +
                        '/' + $scope.input.DueDate.getDate();

                $scope.issueToPost.DueDate = dueDate;
                $scope.issueToPost.ProjectId = $scope.projectId;
                
                issues.addIssueToAProject($scope.issueToPost)
                    .then(function (data) {
                        toastr.success(data.Title + ' was added successfully.');
                        $location.path('issues/' + data.Id);
                    });

            };

            $scope.searchLabel = function (event) {
                if (event.keyCode === 13){
                    $scope.issueToPost.Labels.push({Name: $scope.search.label});
                    $scope.search.label = '';
                }else {
                    labels.getLabelsByFilter($scope.search.label)
                        .then(function (data) {
                            $scope.search.labelSuggestions = data;
                        });
                }
            };
        }
    ]);