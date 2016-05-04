'use strict';

angular.module('issueTracker.footer.footerController', [])
    .controller('FooterCtrl', [
        '$scope',
        '$location',
        function ($scope, $location) {
            $scope.currentPath = $location.path();
        }
    ]);