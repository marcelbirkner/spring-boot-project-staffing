(function() {
  'use strict';

  var module = angular.module('staffing.controller', ['ngRoute', 'staffing.services']);

  module.controller('navigationCtrl', function($rootScope, $scope, $http,
    $location, $route) {

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

  });

  module.controller('homeCtrl', function($scope, $http) {
    $http.get('/api/resource').success(function(data) {
      $scope.greeting = data;
    });
  });

  module.controller('employeeCtrl', function($scope, $http, $route,
    EmployeeService) {
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

  module.controller('customerCtrl', function($scope, $http, $route, customer,
    CustomerService) {
    var ctrl = this;
    ctrl.customer = customer;

    this.remove = function(customer) {
      CustomerService.remove(customer).then(function() {
        $route.reload();
      });
    };

  });

})();
