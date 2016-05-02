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
    .config([
        '$routeProvider',
      function($routeProvider) {
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