'use strict';

/**
 * @ngdoc function
 * @name contactApp.controller:contacts
 * @description
 * # contacts
 * Controller of the contactApp
 */
app.controller('ContactsController', ['$scope','ContactsSrvc','Flash',function($scope,ContactsSrvc,Flash) {

	//alerts
	$scope.successAlert = function () {
        var message = 'Deleted';
        Flash.create('success', message, 'custom-class');        
    };
	
	$scope.failedAlert = function () {
        var message = 'Something went wrong';
        Flash.create('danger', message, 'custom-class');        
    };
	
	ContactsSrvc.query(function(data){
		$scope.contacts = data;
		
	});
	
	$scope.delContact = function(id){
	console.log('here id '+id);
		ContactsSrvc.remove({'id':id},
		function(){
			console.log('deleting');
			$scope.successAlert();
		},
		function(){
			console.log('error deleting');
			$scope.failedAlert();
		});
	};
	
  }]);
