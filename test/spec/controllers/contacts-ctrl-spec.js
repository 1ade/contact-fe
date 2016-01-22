'use strict';
describe('Controller: ContactsController',function(){
	beforeEach(module('contactApp'));
	
	
	var contact1 = {
				id:'12345',
				firstname:'12345-firstname',
				lastname:'12345lastname',
				company:'12345-company',
				url:['http://a.b.c','http://x.y.z','http://e.f.g'],
				email:['a@b.c','x@y.z','d@e.f'],
				phone:['+11(99)9999-9999','+22(99)9999-9999'],
				address:[{'street1':'12345-street-1','street2':'12345-street2-1','city':'12345-city-1','country':'12345-country-1','zip':'12345-zip-1'},{'street1':'12345-street-2','street2':'12345-street2-2','city':'12345-city-2','country':'12345-country-2','zip':'12345-zip-2'}]
			};
	var Flash;
	beforeEach(inject(function(_Flash_){
		Flash = _Flash_;
		spyOn(Flash,'create').and.callThrough();
	}));
	
	var controller;
	var scope;
	var httpBackend;
	var mockContactResource;
	
	var errMessage = 'Something went wrong';	
	var successMessage = 'Deleted';
	
	beforeEach(function(){
		angular.mock.inject(function($injector){
			httpBackend = $injector.get('$httpBackend');
			scope = $injector.get('$rootScope');
			mockContactResource = $injector.get('ContactsSrvc');
			
		});	
	});
	
	describe('Deleting a contact',function(){
		beforeEach(inject(function($controller){
			controller = $controller('ContactsController',{
				$scope: scope,
				ContactsSrvc: mockContactResource,
				Flash: Flash
				
			});
			//spyOn(mockContactResource,'remove');
			httpBackend.when('DELETE','http://localhost:3000/contacts/12345')
				.respond(contact1);
		}));
		
		it('should expose methods for alert management', function() {
			
			expect(scope.successAlert).toBeDefined();
			expect(angular.isFunction(scope.successAlert)).toBe(true);
			
			expect(scope.failedAlert).toBeDefined();
			expect(angular.isFunction(scope.failedAlert)).toBe(true);
		});
		
		it('should expose method to delete Contact', function() {
			expect(scope.delContact).toBeDefined;
			expect(angular.isFunction(scope.delContact)).toBe(true);			
			
		});
		
		it('should call delete', function(){
					
			
			scope.delContact('12345');
			httpBackend.expect('DELETE','http://localhost:3000/contacts/12345')
				.respond(contact1);
		
			
		
		});		
		
		
	});
});