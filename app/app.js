'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'issueTracker.authentication',
    'issueTracker.identity',
    'issueTracker.navbarCtrl',
    'issueTracker.home',
    'issueTracker.dashboardCtrl',
    'issueTracker.issues'
])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr', toastr)
    .config([
        '$routeProvider',
        '$httpProvider',
      function($routeProvider, $httpProvider) {
          
          $httpProvider.interceptors.push([
              '$q',
              'toastr',
              function($q, toastr) {

              return {
                  'responseError': function(rejection) {
                      if (rejection.data && rejection.data['error_description']){
                          toastr.error(rejection.data['error_description']);
                      }else if(rejection.data['ModelState'] && rejection.data['ModelState']['']) {
                          for(var i = 0; i < rejection.data['ModelState'][''].length; i+=1){
                              toastr.error(rejection.data['ModelState'][''][i]);
                          }
                      }else if (rejection.data && rejection.data['Message']) {
                          toastr.error(rejection.data['Message']);
                      }

                      return $q.reject(rejection);
                  }
              }
          }]);

          $routeProvider.when('/', {
              templateUrl: 'app/home/home.html',
              controller: 'HomeCtrl'
          });

          $routeProvider.when('/dashboard', {
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'DashboardCtrl'
          });

          $routeProvider.otherwise({redirectTo: '/'});
}])
    .run(['Authentication', function(authentication) {
        
        authentication.refreshCookie();
    }]);