'use strict';

'use strict';

angular.module('issueTracker.issues.addIssue.addIssueController', [])
    .controller('AddIssueCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'Projects',
        'Issues',
        'Users',
        function ($scope, $routeParams, $location, projects, issues, users) {
            $scope.projectId = $routeParams.projectId;
            $scope.issueToPost = {};
            $scope.users = [];
            $scope.search = {user: ''};

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
                        console.log(data);
                        $location.path('issues/' + data.Id);
                    });

            };
        }
    ]);