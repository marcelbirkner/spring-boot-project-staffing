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
			var customerList = $http.get('/api/customer')
				.then(function(response) {
					if (response.data._embedded) {
						console.log('getAll customer ' + response.data._embedded.customer.length);
						return response.data._embedded.customer;
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
		var offices = [
             {
               "office" : "Solingen",
               "address" : "codecentric AG, Merscheider Straße, Solingen, Germany",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "51.161443",
                 "longitude" : "7.010401000000002"
               }
             }, {
               "office" : "Düsseldorf",
               "address" : "codecentric AG, Kölner Landstraße, Düsseldorf, Germany",
               "telephone" : "+49 (0) 211 99 41 40", 
               "geoLocation" : {
                 "latitude" : "51.19666",
                 "longitude" : "6.81203000000005"
               }
             }, {
               "office" : "Hamburg",
               "address" : "codecentric AG, Valentinskamp, Hamburg, Germany",
               "telephone" : "+49 (0) 40 31 112 184", 
               "geoLocation" : {
                 "latitude" : "53.55539",
                 "longitude" : "9.984919999999988"
               }
             }, {
               "office" : "München",
               "address" : "codecentric AG, Elsenheimerstraße, Munich, Germany",
               "telephone" : "+49 (0) 89 21 54 866-0", 
               "geoLocation" : {
                 "latitude" : "48.143606",
                 "longitude" : "11.500479000000041"
               }
             }, {
               "office" : "Breda",
               "address" : "Codecentric Nederland B.V., Prinsenkade, Breda Centrum, Breda, Netherlands",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "51.589305",
                 "longitude" : "4.771744000000012"
               }
             }, {
               "office" : "Karlsruhe",
               "address" : "Karlsruhe, Germany",
               "telephone" : "+49 (0) 721 9595 683", 
               "geoLocation" : {
                 "latitude" : "49.0068901",
                 "longitude" : "8.403652700000066"
               }
             }, {
               "office" : "Berlin",
               "address" : "Berlin, Germany",
               "telephone" : "+49 (0) 30 695 17 598", 
               "geoLocation" : {
                 "latitude" : "52.52000659999999",
                 "longitude" : "13.404953999999975"
               }
             }, {
               "office" : "Stuttgart",
               "address" : "Stuttgart, Germany",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "48.7758459",
                 "longitude" : "9.182932100000016"
               }
             }, {
               "office" : "Münster",
               "address" : "codecentric AG, Wolbecker Windmühle, Münster, Germany",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "51.926143",
                 "longitude" : "7.718501999999944"
               }
             }, {
               "office" : "Banja Luka",
               "address" : "codecentric, Dr. Mladena Stojanovića, Banja Luka, Republika Srpska, Bosnia and Herzegovina",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "44.77927",
                 "longitude" : "17.19900800000005"
               }
             }, {
               "office" : "Doboj",
               "address" : "codecentric, Svetog Save, Doboj, Republika Srpska, Bosnia and Herzegovina",
               "telephone" : "+49 (0) 212 23 36 280", 
               "geoLocation" : {
                 "latitude" : "44.728812",
                 "longitude" : "18.08858699999996"
               }
             },
             {
                 "office" : "Frankfurt",
                 "address" : "codecentric AG, An der Welle, Frankfurt, Germany",
                 "telephone" : "+49 (0) 212 23 36 280", 
                 "geoLocation" : {
                   "latitude" : "50.118382",
                   "longitude" : "8.67214899999999"
                 }
             }];
		
		this.getAllOfficesForMap = function() {
			offices.forEach(function(entry) {
				entry.title = entry.office;
			    entry.infoBox = '<h3>' + entry.office + '</h3><div class="infoWindowContent">' + entry.address + '<br>' + entry.telephone + '</div>';
			});
			return offices;
		};
		
	}]);

})();
