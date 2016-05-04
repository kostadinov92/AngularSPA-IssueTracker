'use strict';

angular.module('issueTracker.footer.footerDirective', [])
    .directive('footer', [
        function () {
            return {
                templateUrl: 'app/components/common/footer/footer.html',
                controller: 'FooterCtrl',
                restrict: 'A',
                link: function (scope, element) {
                    console.log(scope.currentPath);
                }
            };
        }
    ]);