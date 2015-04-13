(function() {
	'use strict';

	var module = angular.module('staffing.services', []);

	module.service('EmployeeService', ['$http', function($http) {

		this.getAll = function() {
			return $http.get('/api/employees')
				.then(function(response) {
						return response.data;
				});
		};
		
		this.next = function(page, pageSize) {
			if( ! page ) {
				page = 0;
			}
			if( ! pageSize ) {
				pageSize = 20;
			}
			console.log('GET /api/employees?page='+page+'&size='+pageSize);
			return $http.get('/api/employees?page='+page+'&size='+pageSize)
				.then(function(response) {
						return response.data;
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
			var customerList = $http.get('/api/customer')
				.then(function(response) {
					if (response.data._embedded) {
						console.log('getAll customer ' + response.data._embedded.customer.length);
						return response.data._embedded.customer;
					} else {
						return [];
					}
				});
			return customerList;
		};
		
		this.searchCustomer = function(searchField) {
			var params = { params: { customerName: searchField } };
			console.log('Searching customer by name ' + searchField);
			var customerList = $http.get('/api/customer/search/findByCustomerName', params)
				.then(function(response) {
					if (response.data._embedded) {
						console.log('searchCustomer customer ' + response.data._embedded.customer.length);
						return response.data._embedded.customer;
					} else {
						return [];
					}
				});
			return customerList;
		};
		
		this.getAllCustomerForMap = function() {
			return $http.get('/api/customer')
			.then(function(response) {
				if (response.data._embedded) {
					console.log('getAll customer ' + response.data._embedded.customer.length);
					var customerList = response.data._embedded.customer;
					customerList.forEach(function(entry) {
						entry.title = entry.customerName;
					    entry.infoBox = '<h3>' + entry.customerName + '</h3><div class="infoWindowContent">' + entry.address + '</div>';
					});
					return customerList;
				} else {
					return [];
				}
			});
		};

		this.add = function(customer) {
			console.log('add customer ' + JSON.stringify(customer));
			return $http.post('/api/customer', customer);
		};

		this.remove = function(customer) {
			console.log('remove customer ' + customer._links.self.href);
			return $http.delete(customer._links.self.href);
		};

	}]);
	
	module.service('OfficeService', ['$http', function($http) {
		
		this.add = function(office) {
			console.log('add office ' + office);
			return $http.post('/api/office', office);
		};
		
		this.remove = function(office) {
			console.log('remove office ' + office._links.self.href);
			return $http.delete(office._links.self.href);
		};
		
		this.getAll = function() {
			var list = $http.get('/api/office')
				.then(function(response) {
					if (response.data._embedded) {
						console.log('getAll offices ' + response.data._embedded.office.length);
						return response.data._embedded.office;
					} else {
						return [];
					}
				});
			return list;
		};
		
		this.getAllOfficesForMap = function() {
			return $http.get('/api/office')
			.then(function(response) {
				if (response.data._embedded) {
					console.log('getAll office ' + response.data._embedded.office.length);
					var list = response.data._embedded.office;
					list.forEach(function(entry) {
						entry.title = entry.office;
					    entry.infoBox = '<h3>' + entry.office + '</h3><div class="infoWindowContent">' + entry.address + '<br>' + entry.telephone + '</div>';
					});
					return list;
				} else {
					return [];
				}
			});
		};
		
	}]);

})();
