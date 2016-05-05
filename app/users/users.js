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

            return {
                getAllUsers: getAllUsers
            };
        }
    ]);