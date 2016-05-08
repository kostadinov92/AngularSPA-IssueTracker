'use strict';

angular.module('issueTracker.users', [])
    .factory('Users', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getAllUsers() {
                var defered = $q.defer();

                var url = BASE_URL + 'users';
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function getUsersByFilter(filter) {
                var defered = $q.defer();

                var url = BASE_URL + 'users/?filter=Username.Contains("' + filter +'")';
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function makeAdmin(userId) {
                var defered = $q.defer();

                var url = BASE_URL + 'users/makeadmin';
                $http.put(url, {UserId: userId})
                    .then(function (success) {
                        defered.resolve(success);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            return {
                getAllUsers: getAllUsers,
                getUsersByFilter: getUsersByFilter,
                makeAdmin: makeAdmin
            };
        }
    ]);