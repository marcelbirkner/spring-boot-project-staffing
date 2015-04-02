(function() {
  'use strict';

  var module = angular.module('staffing.controller', ['ngRoute', 'staffing.services']);

  module.controller('navigationCtrl', ['$rootScope', '$scope', '$http',
    '$location', '$route',
    function navigationCtrl($rootScope, $scope, $http, $location, $route) {

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
        console.log('login');
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

    }
  ]);

  module.controller('EmployeeCtrl', ['$scope', '$http', '$route', 'employees',
    'EmployeeService',
    function EmployeeCtrl($scope, $http, $route, employees,
      EmployeeService) {
	  
      var ctrl = this;
      ctrl.employees = employees;
      ctrl.newEmployee = {};

      $scope.result = '';
      $scope.options = {};
      $scope.details = {};
      
      $scope.form = {
	    type : 'geocode',
	    watchEnter : true
	  };
      
      ctrl.save = function() {
        console.log('save new employee ' + ctrl.newEmployee.fullName);
        
		var keys = Object.keys($scope.details.geometry.location);
		ctrl.newEmployee.geoLocation = {};
		ctrl.newEmployee.geoLocation.longitude = $scope.details.geometry.location[keys[0]];
		ctrl.newEmployee.geoLocation.latitude = $scope.details.geometry.location[keys[1]];
		console.log(JSON.stringify(ctrl.newEmployee));
				
		EmployeeService.add(ctrl.newEmployee)
	      .then(function() {
	    	$route.reload();
	      });
      };

      ctrl.remove = function(employee) {
        console.log('remove employee ' + employee.fullName);
        EmployeeService.remove(employee)
          .then(function() {
            $route.reload();
          });
      };
    }
  ]);

  module.controller('CustomerCtrl', function CustomerCtrl($route, customer,
    CustomerService) {

    var ctrl = this;
    ctrl.customer = customer;

    ctrl.save = function() {
      console.log('add customer ' + ctrl.newCustomer.customerName);
    };

    ctrl.remove = function(cust) {
      CustomerService.remove(cust).then(function() {
        $route.reload();
      });
    };

    ctrl.resetCustomer = function() {
      console.log('resetCustomer');
    };
  });

})();
