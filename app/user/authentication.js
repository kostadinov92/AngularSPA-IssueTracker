'use strict';

angular.module('issueTracker.authentication', [])
    .factory('Authentication', [
        '$http',
        '$cookies',
        '$q',
        'Identity',
        'BASE_URL',
        function ($http, $cookies, $q, identity, BASE_URL) {

        var AUTHENTICATION_COOKIE_KEY = '-__-Auth-__-';

        function loginUser(user) {
            var loginUserData = 'grant_type=password&username=' + user.email + '&password=' + user.password;

            var deffered = $q.defer();

            $http.post(BASE_URL + 'api/Token', loginUserData, {

            }).then(function (success) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + success.data.access_token;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, $http.defaults.headers.common.Authorization);
                
                identity.requestUserInfo()
                    .then(function (success) {
                        deffered.resolve(success);
                    }, function (error) {
                        deffered.reject(error);
                    });
                console.log(success);
                console.log(!!$cookies.get(AUTHENTICATION_COOKIE_KEY));

            }, function (error) {
                deffered.reject(error);
                console.log(error);
            });
            return deffered.promise;
        }

        function registerUser(user) {
            var loginUserData = 'Email=' + user.email + '&Password=' + user.password + '&ConfirmPassword=' + user.confirmPassword;

            var deffered = $q.defer();

            var request = {
                method: 'POST',
                url: BASE_URL + 'api/Account/Register',
                data: {
                    'Email': user.email,
                    'Password' : user.password,
                    'ConfirmPassword': user.confirmPassword
                },
                headers: {
                    ContentType: 'application/x-www-form-urlencoded'
                }
            };
            
            //$http.post(BASE_URL + 'api/Account/Register', loginUserData)
            $http(request)
                .then(function (success) {
                deffered.resolve(success);
            }, function (error) {
                deffered.reject(error);
                console.log(error);
            });
            return deffered.promise;
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
            registerUser: registerUser,
            loginUser: loginUser,
            logoutUser: logoutUser,
            refreshCookie: refreshCookie,
            isAuthenticated: isAuthenticated
        };
    }]);