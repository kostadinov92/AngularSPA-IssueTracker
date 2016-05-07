'use strict';

angular.module('issueTracker.issues', [])
    .factory('Issues', [
        '$http',
        '$q',
        'BASE_URL',
        function Issues($http, $q, BASE_URL) {

            var requestUrl = BASE_URL + 'issues/';

            function getIssuesByProjectId(id) {
                var defered = $q.defer();

                var url = BASE_URL + 'projects/' + id + '/issues';
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function getUserIssues(pageSize, pageNumber) {
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
                getUserIssues: getUserIssues,
                getIssuesByProjectId: getIssuesByProjectId
            };
        }
    ]);