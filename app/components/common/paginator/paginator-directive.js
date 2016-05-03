'use strict';

angular.module('issueTracker.paginator', [])
.directive('paginator', [
    function PaginatorDirective(params) {
        return{
            templateUrl: 'app/components/common/paginator/paginator.html',
            restrict: 'A',
            //replace: true,  
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@'         
            },
            
            //controller: controllerFunction, //Embed a custom controller in the directive
        link: [
            '$scope',
            '$element',
            '$attrs', 
            '$controller',
            function(scope, element, attrs, controller) {  //DOM manipulation
            
            scope.totalPages = function(){
                return new Array(attrs.totalPages);
            };
            
            
            element.on('keydown', function(event) {
            if(event.keyCode >= 97 && event.keyCode <= 122) {
                return true;
            }
            return false;
            });
            
        }]};
    }
]);