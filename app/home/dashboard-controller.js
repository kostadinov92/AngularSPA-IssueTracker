'use strict';

angular.module('issueTracker.home.dashboardCtrl', [])
    .controller('DashboardCtrl', [
        '$scope',
        '$rootScope',
        '$routeParams',
        'Authentication',
        'Identity',
        'Projects',
        'Issues',
        function ($scope, $rootScope, $routeParams, authentication, identity, projects, issues) {

            $scope.totalProjectPages = [];
            $scope.totalIssuePages = [];
            
            $scope.loadUserRelatedProjects = function () {
                projects.getUserRelatedProjects($rootScope.pageSize, $routeParams.projectsPage)
                    .then(function (data) {
                        $scope.userProjects = data.Projects;
                        $scope.projectsPages = data.TotalPages;

                        for(var i = 0; i < $scope.projectsPages - 1; i+=1){
                            $scope.totalProjectPages[i] = i;
                        }
                    });
            };

            $scope.loadData = function () {
                if(!$routeParams.issuesPage){
                    $routeParams.issuesPage = 1;
                }
                if(!$routeParams.projectsPage){
                    $routeParams.projectsPage = 1;
                }


                $scope.loadUserIssues = function () {
                    issues.getUserIssues($rootScope.pageSize, $routeParams.issuesPage)
                        .then(function (data) {
                            $scope.issues = data.Issues;
                            $scope.issuesPages = data.TotalPages;

                            for(var i = 0; i < $scope.issuesPages - 1; i+=1){
                                $scope.totalIssuePages[i] = i;
                            }
                        });
                };

                $scope.loadUserIssues();
                $scope.loadUserRelatedProjects();
            };

            $scope.loadData();

            $scope.changeProjectsPage = function (pageNumber) {
                $routeParams.projectsPage = pageNumber;
                $scope.loadUserRelatedProjects();
            };
        
            $scope.changeIssuesPage = function (pageNumber) {
                $routeParams.issuesPage = pageNumber;
                $scope.loadUserIssues();
            };
        }
    ]);