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

  module.controller('EmployeeCtrl', ['$scope', '$http', '$route', '$location', 'employees',
    'EmployeeService',
    function EmployeeCtrl($scope, $http, $route, $location, employees, EmployeeService) {
	  
	  $scope.$location = $location;
	  
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

  module.controller('CustomerCtrl', ['$route', '$scope', '$location', 'customer', 'CustomerService', 
                                     function CustomerCtrl($route, $scope, $location, customer, CustomerService) {
	  
	$scope.$location = $location;

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
		ctrl.newCustomer.geoLocation.latitude = $scope.details.geometry.location[keys[0]];
		ctrl.newCustomer.geoLocation.longitude = $scope.details.geometry.location[keys[1]];
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
    
    ctrl.initCustomer = function() {
    	var initCustomerList = [ {
		      "customerName" : "CNC Arena",
		      "industry" : "Industry",
		      "address" : "CNC-Arena GmbH, Eichsfelder Straße, Düsseldorf, Germany",
		      "geoLocation" : {
		        "longitude" : "6.913520000000062",
		        "latitude" : "51.132168"
		      }
		    }, {
		      "customerName" : "REWE",
		      "industry" : "Food",
		      "address" : "REWE Köln, Schwertnergasse, Cologne, Germany",
		      "geoLocation" : {
		        "longitude" : "6.950774000000024",
		        "latitude" : "50.938647"
		      }
		    }, {
		      "customerName" : "Zeppelin",
		      "industry" : "Engineering",
		      "address" : "Zeppelin Baumaschinen GmbH - Stapler / Gabelstapler, Graf-Zeppelin-Platz, Munich, Germany",
		      "geoLocation" : {
		        "longitude" : "11.618330000000014",
		        "latitude" : "48.250165"
		      }
		    }, {
		      "customerName" : "Adidas",
		      "industry" : "Sport",
		      "address" : "Adidas, Adi-Dassler-Straße, Herzogenaurach, Germany",
		      "geoLocation" : {
		        "longitude" : "10.90932799999996",
		        "latitude" : "49.582434"
		      }
		    }, {
		      "customerName" : "Provinzial",
		      "industry" : "Insurance",
		      "address" : "Provinzialplatz, Düsseldorf, Germany",
		      "geoLocation" : {
		        "longitude" : "6.811725499999966",
		        "latitude" : "51.1962127"
		      }
		    }, {
		      "customerName" : "Phoenix Contact",
		      "industry" : "Electronics",
		      "address" : "PHOENIX CONTACT GmbH & Co. KG, Flachsmarktstraße, Blomberg, Germany",
		      "geoLocation" : {
		        "longitude" : "9.104663999999957",
		        "latitude" : "51.934851"
		      }
		    }, {
		      "customerName" : "Generali",
		      "industry" : "Insurance",
		      "address" : "Generali Deutschland Informatik Services GmbH, Anton-Kurze-Allee, Aachen, Germany",
		      "geoLocation" : {
		        "longitude" : "6.0782199999999875",
		        "latitude" : "50.76014"
		      }
		    }, {
		      "customerName" : "Reuter",
		      "industry" : "Sanitary",
		      "address" : "Reuter, Mönchengladbach, Deutschland",
		      "geoLocation" : {
		        "longitude" : "6.352440000000001",
		        "latitude" : "51.21353"
		      }
		    } ];
    	initCustomerList.forEach(CustomerService.add.bind(CustomerService));
        $route.reload();
    };

    ctrl.resetCustomer = function() {
      console.log('resetCustomer');
    };
  }]);
  
    module.controller('OfficeCtrl', ['$route', '$scope', '$location', 'offices', 'OfficeService', 
                                     function OfficeCtrl($route, $scope, $location, offices, OfficeService) {
    	
    	$scope.$location = $location;
    	
    	var ctrl = this;
    	ctrl.offices = offices;
    	
    	ctrl.initOffices = function() {
    		
    		var officeList = [
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
    		
    		officeList.forEach(OfficeService.add.bind(OfficeService));
            $route.reload();
    	};
    	
    	ctrl.remove = function(office) {
    		OfficeService.remove(office).then(function() {
	        $route.reload();
	      });
	    };
    }]);
  
    module.controller('MapCtrl', function ($scope, $location, locations) {

    	$scope.$location = $location;
    	
        var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(51.161443, 7.010401), // head quarter Solingen
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        
        var infoWindow = new google.maps.InfoWindow();
        
        var createMarker = function(info){
            
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.geoLocation.latitude, info.geoLocation.longitude),
                title: info.title
            });
            marker.content = info.infoBox;
            
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent(marker.content);
                infoWindow.open($scope.map, marker);
            });
            
            $scope.markers.push(marker);
            
        }  
        
        for (var i = 0; i < locations.length; i++){
            createMarker(locations[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    });
            
})();
