'use strict';

angular.module('issueTracker.projects', [])
    .factory('Projects', [
        '$http',
        '$q',
        'BASE_URL',
        function Projects($http, $q, BASE_URL) {
            
            function getAllProjects(pageSize, pageNumber) {
                var defered = $q.defer();

                var url = BASE_URL + 'projects?filter=&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                        defered.reject(error);
                    });

                return defered.promise;
            }

            function getUserLeaderProjects() {
                var defered = $q.defer();

                var url = BASE_URL + 'projects?filter=&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                        defered.reject(error);
                    });

                return defered.promise;
            }

            function getProjectById(id) {
                var defered = $q.defer();

                var url = BASE_URL + 'projects/' + id;
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function addProject(project) {
                var defered = $q.defer();

                var url = BASE_URL + 'Projects';
                $http.post(url, project)
                    .then(function (success) {
                        defered.resolve(success);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function editProject(project) {
                var defered = $q.defer();

                var url = BASE_URL + 'Projects/' + project.Id;
                $http.put(url, project)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getUserLeaderProjects: getUserLeaderProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                editProject: editProject
            };
        }
    ]);