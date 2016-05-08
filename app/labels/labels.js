'use strict';

angular.module('issueTracker.labels', [])
    .factory('Labels', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getLabelsByFilter(filter) {
                var defered = $q.defer();

                var url = BASE_URL + 'labels/?filter=' + filter;
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });
                
                return defered.promise;
            }

            return{
                getLabelsByFilter: getLabelsByFilter
            };
        }
    ]);