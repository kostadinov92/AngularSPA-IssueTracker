'use strict';

angular.module('issueTracker.issues', [])
    .factory('Issues', [
        '$http',
        '$q',
        'BASE_URL',
        function Issues($http, $q, BASE_URL) {

            function getIssueById(id) {
                var defered = $q.defer();

                var url = BASE_URL + 'issues/' + id;
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

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
                var url = BASE_URL + 'issues/me?orderBy=DueDate&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
                var deffered = $q.defer();

                $http.get(url)
                    .then(function (success) {
                        deffered.resolve(success.data);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function getCommentsByIssueId(id) {
                var defered = $q.defer();

                var url = BASE_URL + '/issues/' + id + '/comments';
                $http.get(url)
                    .then(function (success) {
                        defered.resolve(success.data);                        
                    }, function (error) {
                        defered.reject(error);
                        console.log(error);
                    });

                return defered.promise;
            }

            function addComment(id, text) {
                var defered = $q.defer();

                var url = BASE_URL + '/issues/' + id + '/comments';
                $http.post(url, {Text: text})
                    .then(function (success) {
                        defered.resolve(success.data);
                    }, function (error) {
                        defered.reject(error);
                        console.log(data);
                    });

                return defered.promise;
            }

            return{
                getIssueById: getIssueById,
                getUserIssues: getUserIssues,
                getIssuesByProjectId: getIssuesByProjectId,
                getCommentsByIssueId: getCommentsByIssueId,
                addComment: addComment
            };
        }
    ]);