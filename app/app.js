'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'issueTracker.authentication',
    'issueTracker.identity',
    'issueTracker.account',
    'issueTracker.profile.changePassword',
    'issueTracker.admin.navbar',
    'issueTracker.navbarCtrl',
    'issueTracker.home',
    'issueTracker.dashboardCtrl',
    'issueTracker.projects',
    'issueTracker.projectsController',
    'issueTracker.projects.projectController',
    'issueTracker.issues',
    'issueTracker.common.backDirective',
    'issueTracker.footer.footerDirective',
    'issueTracker.footer.footerController'
    //'issueTracker.paginator'
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
                      if(rejection.data['ModelState'] && rejection.data['ModelState']){
                          if(rejection.data['ModelState']['']){
                              for(var i = 0; i < rejection.data['ModelState'][''].length; i+=1){
                              toastr.error(rejection.data['ModelState'][''][i]);
                              }
                          }if(rejection.data['ModelState']['model.ConfirmPassword']){
                              for(var i = 0; i < rejection.data['ModelState']['model.ConfirmPassword'].length; i+=1){
                              toastr.error(rejection.data['ModelState']['model.ConfirmPassword'][i]);
                              }
                          }
                      }if (rejection.data && rejection.data['error_description']){
                          toastr.error(rejection.data['error_description']);
                      }if (rejection.data && rejection.data['Message']) {
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

          $routeProvider.when('/profile/password', {
              templateUrl: 'app/profile/change-password.html',
              controller: 'ChangePasswordCtrl'
          });

          $routeProvider.when('/projects', {
              templateUrl: 'app/projects/all/projects.html',
              controller: 'ProjectsCtrl'
          });
          

          $routeProvider.when('/projects/:projectId', {
              templateUrl: 'app/projects/project/project.html',
              controller: 'ProjectCtrl'
          });

          $routeProvider.when('/projects/:projectId/edit', {
              templateUrl: 'app/projects/project/edit-project.html',
              controller: 'ProjectCtrl'
          });

          $routeProvider.otherwise({redirectTo: '/'});
}])
    .run(['Authentication', function(authentication) {
        
        authentication.refreshCookie();
    }]);