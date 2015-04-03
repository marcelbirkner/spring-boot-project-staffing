(function(){
  'use strict';

  var app = angular.module('staffing.directives', []);

  app.directive('customerNavigation', function(){
	  return {
	    restrict: 'E',
	    templateUrl: 'partials/customerNavigation.html'
	  };
  });
  
})();