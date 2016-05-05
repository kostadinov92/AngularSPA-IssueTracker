'use strict';

angular.module('issueTracker.projects.all.projectsController', [])
    .controller('ProjectsCtrl', [
        '$scope',
        '$location',
        'Projects',
        'Identity',
        'Users',
        function ProjectsCtrl($scope, $location,projects, identity, users) {

            $scope.users = {};
            $scope.projectToPost = {};
            $scope.isAdmin = identity.isAdmin;
            $scope.currentPath = $location.path();

            $scope.totalPages = function () {
                return [];
            };

            $scope.addProject = function () {

                var arr = $scope.projectToPost.priorities.split(',');
                $scope.projectToPost.priorities = [];
                for (var i = 0; i < arr.length; i+=1){
                    $scope.projectToPost.priorities[i] = {
                        Name: arr[i]
                    };
                }

                projects.addProject($scope.projectToPost)
                    .then(function (success) {
                        console.log(success);
                    });

            };

            projects.getAllProjects(25, 22)
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

            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });
            
            

        }
    ]);