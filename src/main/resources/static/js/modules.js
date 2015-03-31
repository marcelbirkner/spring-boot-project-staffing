(function() {
	'use strict';

	var module = angular.module('staffing', ['ngRoute']);

	module.config(function($routeProvider, $httpProvider) {

		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'homeCtrl'
		}).when('/login', {
			templateUrl: 'login.html',
		}).when('/employees', {
			templateUrl: 'employees.html',
			controller: 'employeeCtrl',
		    controllerAs: 'ctrl'
		}).otherwise('/');

		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	});

	module.controller('navigationCtrl', function($rootScope, $scope, $http, $location, $route) {

		$scope.tab = function(route) {
			return $route.current && route === $route.current.controller;
		};

		var authenticate = function(credentials, callback) {

			var headers = credentials ? {
				authorization: 'Basic ' + btoa(credentials.username + ':' +
					credentials.password)
			} : {};

			$http.get('user', {
				headers: headers
			}).success(function(data) {
				if (data.name) {
					$rootScope.authenticated = true;
				} else {
					$rootScope.authenticated = false;
				}
				callback && callback($rootScope.authenticated);
			}).error(function() {
				$rootScope.authenticated = false;
				callback && callback(false);
			});

		};

		authenticate();

		$scope.credentials = {};
		$scope.login = function() {
			authenticate($scope.credentials, function(authenticated) {
				if (authenticated) {
					console.log('Login succeeded')
					$location.path('/');
					$scope.error = false;
					$rootScope.authenticated = true;
				} else {
					console.log('Login failed')
					$location.path('/login');
					$scope.error = true;
					$rootScope.authenticated = false;
				}
			});
		};

		$scope.logout = function() {
			$http.post('/logout', {}).success(function() {
				console.log('Logout success');
				$rootScope.authenticated = false;
				$location.path('/');
			}).error(function(data) {
				console.log('Logout failed ' + data);
				$rootScope.authenticated = false;
			});
		}

	});

	module.controller('homeCtrl', function($scope, $http) {
		$http.get('/api/resource').success(function(data) {
			$scope.greeting = data;
		});
	});
	
	module.controller('employeeCtrl', function($scope, $http, $route, EmployeeService) {
		var ctrl = this;
		$http.get('/api/employees').success(function(data) {
			$scope.employees = data;
			ctrl.employees = data;
		});
		
		ctrl.remove = function(employee) {
			console.log('remove employee ' + employee.fullName);
			EmployeeService.remove(employee.id)
		      .then(function() {
		        $route.reload();
		      });
	    };
	});
	
	module.service('EmployeeService', function($http) {
	    
		this.getAll = function() {
	      return $http.get('/api/employees')
	      .then(function(response) {
	    	console.log('getAll employees');
	        return response.data;
	      });
	    };

	    this.add = function(employee) {
	      console.log('add employee');
	      return $http.post('/api/employees', employee);
	    };

	    this.remove = function(id) {
	      console.log('remove employee with id ' + id);
	      return $http.delete('/api/employees/' + id);
	    };
	    
	});

})();
