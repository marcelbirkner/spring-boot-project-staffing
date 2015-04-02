(function() {
	'use strict';

	var module = angular.module('staffing', ['ngRoute', 'ngAutocomplete', 'staffing.services', 'staffing.controller']);

	module.config(function($routeProvider, $httpProvider) {

		$routeProvider.when('/', {
			templateUrl: 'partials/home.html'
		}).when('/login', {
			templateUrl: 'partials/login.html'
		}).when('/employees', {
			templateUrl: 'partials/employees.html',
			controller: 'EmployeeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				employees: function(EmployeeService) {
					return EmployeeService.getAll();
				}
			}
		}).when('/addEmployee', {
			templateUrl: 'partials/addEmployee.html',
			controller: 'EmployeeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				employees: function(EmployeeService) {
					return EmployeeService.getAll();
				}
			}
		}).when('/addCustomer', {
			templateUrl: 'partials/addCustomer.html',
			controller: 'CustomerCtrl',
			resolve: {
				customer: function(CustomerService) {
					return CustomerService.getAll();
				}
			}
		}).when('/customer', {
			templateUrl: 'partials/customer.html',
			controller: 'CustomerCtrl',
			controllerAs: 'ctrl',
			resolve: {
				customer: function(CustomerService) {
					return CustomerService.getAll();
				}
			}
		}).otherwise('/');

		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	});

})();
