(function() {
	'use strict';

	var module = angular.module('staffing', ['ngRoute', 'ngAutocomplete', 'staffing.services', 'staffing.controller', 'staffing.directives', 'staffing.filter']);

	module.config(function($routeProvider, $httpProvider) {

		$routeProvider.when('/', {
			templateUrl: 'partials/home.html'
		}).when('/login', {
			templateUrl: 'partials/login.html'
		}).when('/offices', {
			templateUrl: 'partials/offices.html',
			controller: 'OfficeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				offices: function(OfficeService) {
					return OfficeService.getAll();
				}
			}
		}).when('/addOffice', {
			templateUrl: 'partials/addOffice.html',
			controller: 'OfficeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				offices: function(OfficeService) {
					return OfficeService.getAll();
				}
			}
		}).when('/officesMap', {
			templateUrl: 'partials/officesMap.html',
			controller: 'MapCtrl',
			resolve: {
				locations: function(OfficeService) {
					return OfficeService.getAllOfficesForMap();
				}
			}
		}).when('/employees', {
			templateUrl: 'partials/employees.html',
			controller: 'EmployeeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				employees: function(EmployeeService, $location) {
					console.log($location.search());
					return EmployeeService.next($location.search().page, $location.search().pageSize);
				}
			}
		}).when('/employees/search/findByFullName', {
			templateUrl: 'partials/employees.html',
			controller: 'EmployeeCtrl',
			controllerAs: 'ctrl',
			resolve: {
				employees: function(EmployeeService, $location) {
					console.log($location.search());
					return EmployeeService.findByFullName($location.search().fullName);
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
			controllerAs: 'ctrl',
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
		}).when('/customerLocation', {
			templateUrl: 'partials/customerLocation.html',
			controller: 'MapCtrl',
			resolve: {
				locations: function(CustomerService) {
					return CustomerService.getAllCustomerForMap();
				}
			}
		}).otherwise('/');

		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	});

})();
