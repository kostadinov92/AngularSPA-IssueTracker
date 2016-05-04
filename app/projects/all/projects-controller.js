'use strict';

angular.module('issueTracker.projectsController', [])
    .controller('ProjectsCtrl', [
        '$scope',
        '$location',
        'Projects',
        function ProjectsCtrl($scope, $location, projects) {
            $scope.currentPath = $location.path();
            $scope.totalPages = function () {
                return [];
            };
            projects.getAllProjects(25, 3)
                .then(function (success) {
                    $scope.projects = success.Projects;
                    $scope.totalProjects = success.TotalCount;
                    
                    $scope.totalPages = function () {
                        var arr = [];
                        for(var i = 0; i < success.TotalPages - 1; i+=1){
                            arr[i] = i;
                        }
                        return arr;
                    };              
                    console.log($scope.currentPath);
                    console.log(success);
                });
        }
    ]);