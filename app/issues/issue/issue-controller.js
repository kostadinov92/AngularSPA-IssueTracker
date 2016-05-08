'use strict';

'use strict';

angular.module('issueTracker.issues.issue.issueController', [])
    .controller('IssueCtrl', [
        '$scope',
        '$route',
        '$routeParams',
        '$location',
        'Issues',
        'Projects',
        'Identity',
        function ($scope, $route, $routeParams, $location, issues, projects, identity) {

            $scope.issueId = $routeParams.issueId;
            $scope.user = identity.getUser;
            $scope.relatedUsers = [];
            $scope.isUserRelated = false;
            $scope.inputAddComment = {};

            $scope.issue = {};

            issues.getIssueById($scope.issueId)
                .then(function (data) {
                    $scope.issue = data;
                    console.log(data);

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