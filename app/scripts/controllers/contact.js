'use strict';

/**
 * @ngdoc function
 * @name contactApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the contactApp
 */
app.controller('ContactController', ['$scope','$routeParams','ContactsSrvc','Flash',function($scope,$routeParams,ContactsSrvc,Flash){
	var id = id ||$routeParams.id;		
	if(id){	
	ContactsSrvc.get({'id':id},function(data){
			$scope.contact = data;
			//$scope.myCroppedImage = data.photo;
		},function(){
			console.log("error");
			$scope.failedAlert();
		});		
	}		
	var contact ={
			phone:[],
			address:[],
			url:[],
			email:[]
	  };	  
	if(!$scope.contact)  $scope.contact = contact;
	
	//alerts
	$scope.successAlert = function () {
        var message = 'Saved';
        Flash.create('success', message, 'custom-class');        
    };
	$scope.infoAlert = function () {
        var message = 'Updated';
        Flash.create('info', message, 'custom-class');        
    };
	$scope.failedAlert = function () {
        var message = 'Something went wrong';
        Flash.create('danger', message, 'custom-class');        
    };
  
	//persist
	$scope.addContact = function(contact){
		$scope.contact.photo = $scope.myCroppedImage;
	
		if(id){	
			
			ContactsSrvc.update({'id':id},$scope.contact,function(){
				$scope.infoAlert();				
			},function(){				
				$scope.failedAlert();
			});
		}
		else{
			ContactsSrvc.save(contact,function(){
				$scope.successAlert();
			},function(){
				$scope.failedAlert();
			});
		}	
	};
  
}]);