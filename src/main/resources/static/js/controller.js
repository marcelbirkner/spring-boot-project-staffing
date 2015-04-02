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

  module.controller('homeCtrl', ['$scope', '$http', function homeCtrl($scope, $http) {
    $http.get('/api/resource').success(function(data) {
      $scope.greeting = data;
    });
  }]);

  module.controller('EmployeeCtrl', function EmployeeCtrl($scope, $http, $route, employees, EmployeeService) {

	  var ctrl = this;
	  ctrl.employees = employees;
	  ctrl.heading = 'Employee Controller';
	  ctrl.buttonLabel = 'Save Employee';
	  
	  ctrl.save = function() {
		  console.log('ctrl save');
		  console.log('ctrl movie ' + ctrl.movie.title);
//		  EmployeeService.add(ctrl.movie)
//	      .then(function() {
//	        $location.path(BASE_URL);
//	      });
	  };
	  
      ctrl.remove = function(employee) {
        console.log('remove employee ' + employee.fullName);
        EmployeeService.remove(employee)
          .then(function() {
            $route.reload();
          });
      };
  });

  module.controller('CustomerCtrl', function CustomerCtrl($route, customer, CustomerService) {
	  
      var ctrl = this;
      ctrl.customer = customer;

      ctrl.addCustomer = function() {
          console.log('add customer');
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
