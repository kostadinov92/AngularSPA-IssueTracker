'use strict';

angular.module('issueTracker.authentication', [])
    .factory('Authentication', ['$http', '$cookies', '$q', 'BASE_URL', function ($http, $cookies, $q, BASE_URL) {

        var AUTHENTICATION_COOKIE_KEY = '-__-Auth-__-';

        function loginUser(user) {
            var loginUserData = "grant_type=password&username=" + user.email + "&password=" + user.password;

            var deffered = $q.defer();

            $http.post(BASE_URL + 'api/Token', loginUserData, {

            }).then(function (success) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + success.data.access_token;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, $http.defaults.headers.common.Authorization);
                console.log(success);
                console.log(!!$cookies.get(AUTHENTICATION_COOKIE_KEY));

            }, function (error) {
                console.log(error);
            });
        }

        function logoutUser() {
            $http.defaults.headers.common.Authorization = undefined;
            $cookies.remove(AUTHENTICATION_COOKIE_KEY);
        }

        function isAuthenticated() {
            console.log(!!$cookies.get(AUTHENTICATION_COOKIE_KEY));
            return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
        }

        function refreshCookie() {
            if (isAuthenticated()) {
                $http.defaults.headers.common.Authorization = $cookies.get(AUTHENTICATION_COOKIE_KEY);
            }
        }

        return {
            loginUser: loginUser,
            logoutUser: logoutUser,
            refreshCookie: refreshCookie,
            isAuthenticated: isAuthenticated
        };
    }]);