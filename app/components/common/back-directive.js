'use strict';

angular.module('issueTracker.common.backDirective', [])
    .directive('backDirective', [
        '$window',
        function ($window) {
        return{
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    $window.history.back();
                });
            }
        };
    }]);