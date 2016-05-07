'use strict';

'use strict';

angular.module('issueTracker.issues.issue.issueController', [])
    .controller('IssueCtrl', [
        '$scope',
        '$routeParams',
        'Issues',
        'Projects',
        'Identity',
        function ($scope, $routeParams, issues, projects, identity) {

            $scope.issueId = $routeParams.issueId;
            $scope.user = identity.getUser;

            issues.getIssueById($scope.issueId)
                .then(function (data) {
                    $scope.issue = data;
                    console.log(data);


                    projects.getProjectById($scope.issue.Project.Id)
                        .then(function (data) {
                            $scope.issue.Project.Leader = data.Lead;
                        });
                });

            issues.getCommentsByIssueId($scope.issueId)
                .then(function (data) {
                    if(data.length > 0){
                        $scope.issue.comments = data;
                    }
                });
        }
    ]);