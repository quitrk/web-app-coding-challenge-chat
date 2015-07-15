(function () {
  /* global angular, moment, _ */
  'use strict';

  var directives = angular.module('directives', []);

  directives.directive('momentFormatter',
    function () {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elem, attr) {
          if (attr.momentFormatter) {
            elem.text(moment(parseInt(attr.momentFormatter)).startOf('minute').fromNow());
          }
        }
      };
    }
  );

  directives.directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", _.debounce(function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      }, 200));
    };
  });
}());