'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'angular-loading-bar',
    'issueTracker.components.common.footer.footerDirective',
    'issueTracker.components.common.paginator.paginatorDirective',
    'issueTracker.common.navbarCtrl',
    'issueTracker.common.backDirective',
    'issueTracker.home.homeCtrl',
    'issueTracker.home.dashboardCtrl',
    'issueTracker.home.registrationCtrl',
    'issueTracker.projects',
    'issueTracker.projects.all.projectsController',
    'issueTracker.projects.project.projectController',
    'issueTracker.issues',
    'issueTracker.users',
    'issueTracker.issues.issue.issueController',
    'issueTracker.users.authentication',
    'issueTracker.users.identity',
    'issueTracker.users.account',
    'issueTracker.users.profile.changePasswordCtrl',
    
])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr', toastr)
    .constant('jQuery', $)
    .config([
        '$routeProvider',
        '$httpProvider',
      function($routeProvider, $httpProvider) {

          $routeProvider.when('/', {
              templateUrl: 'app/home/home.html'
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

          $routeProvider.when('/issues/:issueId', {
              templateUrl: 'app/issues/issue/issue.html',
              controller: 'IssueCtrl'
          });

          $routeProvider.otherwise({redirectTo: '/'});

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
}])
    .run([
        'Authentication',
        'Identity',
        function(authentication, identity) {
            authentication.refreshCookie();
            identity.requestUserInfo();
    }]);