'use strict';

angular.module('issueTracker.issues', [])
    .factory('Issues', [
        '$http',
        '$q',
        'BASE_URL',
        function Issues($http, $q, BASE_URL) {

            var requestUrl = BASE_URL + 'issues/';

            function getCurrentUserIssues(pageSize, pageNumber) {
                var url = requestUrl + 'me?orderBy=DueDate&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
                var deffered = $q.defer();

                $http.get(url)
                    .then(function (success) {
                        deffered.resolve(success.data);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return{
                getCurrentUserIssues: getCurrentUserIssues
            };
        }
    ]);