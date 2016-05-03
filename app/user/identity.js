'use strict';

angular.module('issueTracker.identity', [])
    .factory('Identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
        var user = {};

        function isAdmin() {
                return user.isAdmin;
            }

        function requestUserInfo() {
            var deffered = $q.defer();
            var url = BASE_URL + 'Users/me';
            
            $http.get(url)
                .then(function (success) {
                    user = success.data;
                    
                    console.log(user);
                    deffered.resolve(success);
                }, function (error) {
                    deffered.reject(error);
                });
            return deffered.promise;
        }
        
        

        return{
            requestUserInfo: requestUserInfo,
            isAdmin: isAdmin
        };
}]);