'use strict';

angular.module('issueTracker.components.common.footer.footerDirective', [])
    .directive('footer', [
        '$location',
        function ($location) {
            return {
                templateUrl: 'app/components/common/footer/footer.html',
                restrict: 'A',
                link: function (scope, element) {
                    scope.currentPath = $location.path();
                }
            };
        }
    ]);