(function() {
	'use strict';

	var app = angular.module('staffing.directives', []);

	app.directive('customerNavigation', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/customerNavigation.html'
		};
	});
	app.directive('employeeNavigation', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/employeeNavigation.html'
		};
	});
	app.directive('officeNavigation', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/officeNavigation.html'
		};
	});

})();
