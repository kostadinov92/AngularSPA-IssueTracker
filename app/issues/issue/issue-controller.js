'use strict';

'use strict';

angular.module('issueTracker.issues.issue.issueController', [])
    .controller('IssueCtrl', [
        '$scope',
        '$route',
        '$routeParams',
        '$location',
        '$window',
        'Issues',
        'Projects',
        'Identity',
        'Users',
        'toastr',
        function ($scope, $route, $routeParams, $location, $window, issues, projects, identity, users, toastr) {

            $scope.issueId = $routeParams.issueId;
            $scope.user = identity.getUser;
            $scope.relatedUsers = [];
            $scope.isUserRelated = false;
            $scope.inputAddComment = {};
            $scope.search = {user: ''};

            $scope.issue = {};

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

            $scope.editIssue = function () {
                delete $scope.issue.Id;
                delete $scope.issue.Author;
                delete $scope.issue.IssueKey;
                delete $scope.issue.AvailableStatuses;
                delete $scope.issue.Project;
                delete $scope.issue.Status;

                var assigneeId = $scope.issue.Assignee.Id;
                delete $scope.issue.Assignee;
                $scope.issue.AssigneeId = assigneeId

                var priorityId = $scope.issue.Priority.Id;
                delete $scope.issue.Priority;
                $scope.issue.PriorityId = priorityId;

                issues.editIssue($scope.issueId, $scope.issue)
                    .then(function (success) {
                        $window.history.back();
                        toastr.success($scope.issue.Title + ' was edited successfully.')
                    });
            };

            issues.getIssueById($scope.issueId)
                .then(function (data) {
                    $scope.issue = data;
                    console.log(data);

                    $scope.search.user = $scope.issue.Assignee.Username;
                    $scope.loadUsersByFilter();


                    issues.getCommentsByIssueId($scope.issueId)
                        .then(function (data) {
                            if(data.length > 0){
                                $scope.issue.comments = data;
                            }
                        });

                    projects.getProjectById($scope.issue.Project.Id)
                        .then(function (data) {
                            $scope.issue.Project = data;

                            issues.getIssuesByProjectId($scope.issue.Project.Id)
                                .then(function (data) {
                                    $scope.issue.Project.Issues = data;
                                    $scope.relatedUsers.push($scope.issue.Project.Lead);
                                    if($scope.issue.Project.Lead.Id === identity.getUser().Id){
                                        $scope.isUserRelated = true;
                                    }

                                    for(var i = 0; i < $scope.issue.Project.Issues.length; i+=1){
                                        $scope.relatedUsers.push($scope.issue.Project.Issues[i].Assignee);
                                        if($scope.issue.Project.Issues[i].Assignee.Id === identity.getUser().Id){
                                            $scope.isUserRelated = true;
                                        }
                                    }
                                });
                        });
                });

                $scope.changeStatus = function (statusId) {
                    issues.changeIssueStatus($scope.issueId ,statusId)
                        .then(function (success) {
                            $route.reload();
                        });
                };

            $scope.addComment = function () {

                issues.addComment($scope.issueId, $scope.inputAddComment.Text)
                    .then(function (data) {
                        $scope.issue.comments = data;
                    });
            };


        }
    ]);