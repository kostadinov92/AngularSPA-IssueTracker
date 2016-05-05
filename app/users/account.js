'use strict';

angular.module('issueTracker.users.account', [])
    .factory('Account', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function changePassword(data) {
                var defered = $q.defer();

                var url = BASE_URL + 'api/Account/ChangePassword';
                $http.post(url, data)
                    .then(function (success) {
                        defered.resolve(success);
                    }, function (error) {
                        defered.reject(error);
                    });

                return defered.promise;
            }

            return{
                changePassword: changePassword
            };
        }
    ]);