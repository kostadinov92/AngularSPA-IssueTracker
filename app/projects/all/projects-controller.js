'use strict';

angular.module('issueTracker.projects.all.projectsController', [])
    .controller('ProjectsCtrl', [
        '$scope',
        '$rootScope',
        '$route',
        '$routeParams',
        '$location',
        'Projects',
        'Identity',
        'Users',
        'toastr',
        function ProjectsCtrl($scope, $rootScope, $route, $routeParams, $location, projects, identity, users, toastr) {

            $scope.users = {};
            $scope.projectToPost = {};
            $scope.search = {user: ''};
            $scope.totalPages = function () {
                return [];
            };
            $scope.isAdmin = identity.isAdmin;
            
            $scope.changePageSize = function (size) {
                $rootScope.pageSize = size;
                console.log($rootScope.pageSize);
                $scope.loadProjects();
            };
            
            $scope.currentPath = $location.path();

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
                        toastr.success(success.data.Description + ' was created successfully.');
                        console.log(success.data);
                    });

            };

            $scope.loadProjects = function(){


                if(!$routeParams.page){
                    $routeParams.page = 1;
                }

                $scope.loadUsersByFilter = function () {
                    console.log($scope.search.user.length);
                    if($scope.search.user.length < 2){
                        return;
                    }
                    users.getUsersByFilter($scope.search.user)
                        .then(function (data) {
                            $scope.users = data;
                            console.log(data);
                        });
                };

                projects.getAllProjects($rootScope.pageSize, $routeParams.page)
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
                        console.log(success);
                    });
            };
            $scope.loadProjects();

            $scope.loadAllUsers = function () {
                users.getAllUsers()
                    .then(function (data) {
                        $scope.users = data;
                    });
            };


        }
    ]);