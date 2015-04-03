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
      
      $scope.errorMessage = '';
      $scope.result = '';
      $scope.options = {};
      $scope.details = {};
      
      $scope.form = {
	    type : 'geocode',
	    watchEnter : true
	  };
      
      ctrl.save = function() {
        console.log('save new employee ' + ctrl.newEmployee.fullName);
        
        if ( ! $scope.details.geometry ) {
            $scope.errorMessage = 'Please check the address';
            return;
        }
        
		var keys = Object.keys($scope.details.geometry.location);
		ctrl.newEmployee.geoLocation = {};
		ctrl.newEmployee.geoLocation.longitude = $scope.details.geometry.location[keys[0]];
		ctrl.newEmployee.geoLocation.latitude = $scope.details.geometry.location[keys[1]];
		ctrl.newEmployee.address = ctrl.address;
		
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

  module.controller('CustomerCtrl', ['$route', '$scope', 'customer', 'CustomerService', 
                                     function CustomerCtrl($route, $scope, customer, CustomerService) {

    var ctrl = this;
    ctrl.customer = customer;
    ctrl.newCustomer = {};
    
    $scope.errorMessage = '';
    $scope.result = '';
    $scope.options = {};
    $scope.details = {};

    ctrl.save = function() {
        console.log('save customer ' + ctrl.newCustomer.customerName);
        
        if ( ! $scope.details.geometry ) {
            $scope.errorMessage = 'Please check the address';
            return;
        }
        
		var keys = Object.keys($scope.details.geometry.location);
		ctrl.newCustomer.geoLocation = {};
		ctrl.newCustomer.geoLocation.longitude = $scope.details.geometry.location[keys[0]];
		ctrl.newCustomer.geoLocation.latitude = $scope.details.geometry.location[keys[1]];
		ctrl.newCustomer.address = ctrl.address;
		
		CustomerService.add(ctrl.newCustomer)
	      .then(function() {
	    	$route.reload();
	      });
      };

    ctrl.remove = function(cust) {
      CustomerService.remove(cust).then(function() {
        $route.reload();
      });
    };

    ctrl.resetCustomer = function() {
      console.log('resetCustomer');
    };
  }]);
  
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

            module.controller('MapCtrl', function ($scope) {

                var mapOptions = {
                    zoom: 5,
                    center: new google.maps.LatLng(51.161443, 7.010401), // Headquarter Solingen
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }

                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                $scope.markers = [];
                
                var infoWindow = new google.maps.InfoWindow();
                
                var createMarker = function(info){
                    
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.geoLocation.latitude, info.geoLocation.longitude),
                        title: info.office
                    });
                    marker.content = '<div class="infoWindowContent">' + info.address + '<br>' + info.telephone + '</div>';
                    
                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h3>Office ' + marker.title + '</h3>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });
                    
                    $scope.markers.push(marker);
                    
                }  
                
                for (var i = 0; i < offices.length; i++){
                    createMarker(offices[i]);
                }

                $scope.openInfoWindow = function(e, selectedMarker){
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }

            });

})();
