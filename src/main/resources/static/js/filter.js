(function() {
  'use strict';

  var module = angular.module('staffing.filter', []);

  module.filter('filterQueryString', function() {
    return function(input) {
      if (typeof input === 'undefined' || input.indexOf('?') === -1) {
        return '';
      } else {
        return input.substring(input.indexOf('?')).replace('{&sort}',
          '');
      }
    };
  });

})();
