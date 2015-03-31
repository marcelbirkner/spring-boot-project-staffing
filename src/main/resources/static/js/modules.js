(function() {
  'use strict';

  var module = angular.module('staffing', ['staffing.services', 'staffing.controller', 'ngRoute']);

  module.config(function($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    }).when('/login', {
      templateUrl: 'login.html'
    }).when('/employees', {
      templateUrl: 'employees.html',
      controller: 'employeeCtrl',
      controllerAs: 'ctrl'
    }).when('/customer', {
      templateUrl: 'customer.html',
      controller: 'customerCtrl',
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
