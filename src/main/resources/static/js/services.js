(function() {
	'use strict';

	var module = angular.module('staffing.services', []);

	module.service('EmployeeService', ['$http', function($http) {

		this.getAll = function() {
			return $http.get('/api/employees')
				.then(function(response) {
					if (response.data._embedded) {
						console.log('getAll employees ' + response.data._embedded.employee.length);
						return response.data._embedded.employee;
					}
				});
		};

		this.add = function(employee) {
			console.log('add employee ' + employee);
			return $http.post('/api/employees', employee);
		};

		this.remove = function(employee) {
			console.log('remove employee ' + employee._links.self.href);
			return $http.delete(employee._links.self.href);
		};

	}]);

	module.service('CustomerService', ['$http', function($http) {

		this.getAll = function() {
			return $http.get('/api/customer')
				.then(function(response) {
					if (response.data._embedded) {
						console.log('getAll customer ' + response.data._embedded.customer.length);
						return response.data._embedded.customer;
					}
				});
		};

		this.add = function(customer) {
			console.log('add customer');
			return $http.post('/api/customer', customer);
		};

		this.remove = function(customer) {
			console.log('remove customer ' + customer._links.self.href);
			return $http.delete(customer._links.self.href);
		};

	}]);

})();
