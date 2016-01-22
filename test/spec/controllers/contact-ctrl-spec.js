'use strict';
describe('Controller: ContactController',function(){
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
	var contact_empty ={
			phone:[],
			address:[],
			url:[],
			email:[]
	  };
	
	var Flash;
	beforeEach(inject(function(_Flash_){
		Flash = _Flash_;
		spyOn(Flash,'create').and.callThrough();
	}));
	
	var controller;
	var scope;
	var routeParams;	
	var httpBackend;
	var mockContactResource;
	
	var errMessage = 'Something went wrong';	
	var infoMessage = 'Updated';
	var successMessage = 'Saved';
	
	beforeEach(function(){
		angular.mock.inject(function($injector){
			httpBackend = $injector.get('$httpBackend');
			scope = $injector.get('$rootScope');
			mockContactResource = $injector.get('ContactsSrvc');
			
		});	
	});
	
	describe('contact id exists',function(){
		beforeEach(inject(function($controller){
			routeParams = {id: '12345'};
			controller = $controller('ContactController',{
				$scope: scope,
				$routeParams: routeParams,
				ContactsSrvc: mockContactResource,
				Flash: Flash
				
			});
			
		}));
		
		
		it('should call get when id in $routeParams',function(){
			httpBackend.whenGET("http://localhost:3000/contacts/12345").respond(contact1);
			httpBackend.flush();
			httpBackend.expectGET('http://localhost:3000/contacts/12345')
				.respond(contact1);
		
		});
		
		it('should set contact id in scope  when get call is successful',function(){
			httpBackend.whenGET("http://localhost:3000/contacts/12345").respond(contact1);
			httpBackend.flush();
			expect(scope.contact).not.toBe(undefined);
			expect(scope.contact.id).toEqual(contact1.id);
		});
		
		
		it('should call failedAlert when get call fails',function(){
			httpBackend.when("GET","http://localhost:3000/contacts/12345").respond(404,'not found');
			httpBackend.flush();
			
			expect(Flash.create).toHaveBeenCalledWith('danger',errMessage,'custom-class');
			expect(Flash.create.calls.count()).toBe(1);
		});
		
		it('should expose methods for alert management', function() {
			
			expect(scope.successAlert).toBeDefined();
			expect(angular.isFunction(scope.successAlert)).toBe(true);
			
			expect(scope.infoAlert).toBeDefined();
			expect(angular.isFunction(scope.infoAlert)).toBe(true);
			
			expect(scope.failedAlert).toBeDefined();
			expect(angular.isFunction(scope.failedAlert)).toBe(true);
		});
		
		it('should expose method to persist Contact', function() {
			expect(scope.addContact).toBeDefined();
			expect(angular.isFunction(scope.addContact)).toBe(true);			
			
		});
		
		it('should call update  method to persist Contact', function() {
			httpBackend.whenGET("http://localhost:3000/contacts/12345").respond(contact1);
			httpBackend.flush();
			scope.addContact(contact1);

			httpBackend.when('PUT','http://localhost:3000/contacts/12345')
				.respond(contact1);
				
			httpBackend.flush();
			
			httpBackend.expect('PUT','http://localhost:3000/contacts/12345')
				.respond(contact1);
			
		});
		
		it('should call info alert if update is fine', function() {
			
			httpBackend.whenGET("http://localhost:3000/contacts/12345").respond(contact1);
			httpBackend.flush();
			scope.addContact(contact1);

			httpBackend.when('PUT','http://localhost:3000/contacts/12345')
				.respond(contact1);
			httpBackend.flush();
			
			expect(Flash.create).toHaveBeenCalledWith('info',infoMessage,'custom-class');
			expect(Flash.create.calls.count()).toBe(1);
		});
		
		it('should call failed alert if update isnt fine', function() {
			httpBackend.whenGET("http://localhost:3000/contacts/12345").respond(contact1);
			httpBackend.flush();
			scope.addContact(contact1);

			httpBackend.when('PUT','http://localhost:3000/contacts/12345')
				.respond(404,'contact not found');
			httpBackend.flush();
			
			expect(Flash.create).toHaveBeenCalledWith('danger',errMessage,'custom-class');
			expect(Flash.create.calls.count()).toBe(1);
		});
		
		
	});
	
	describe('no contact id exists',function(){
		beforeEach(inject(function($controller){		
			controller = $controller('ContactController',{
				$scope: scope,
				ContactsSrvc: mockContactResource,
				Flash: Flash
				
			});
			
		}));
		
		it('it should not call get when no id in $routeParams',function(){
			spyOn(mockContactResource,'get');
			expect(mockContactResource.get).not.toHaveBeenCalled();		
		});
		
		it('should set empty contact in scope get when id not in $routeParams',function(){
			expect(scope.contact).toEqual(contact_empty);			
		});
		it('should call save  method to persist Contact', function() {
			spyOn(mockContactResource,'save');
			scope.addContact(contact1);
			expect(mockContactResource.save).toHaveBeenCalled();
			expect(mockContactResource.save.calls.count()).toBe(1);		
			
		});
		
		it('should call success alert if save is fine', function() {
			scope.addContact(contact1);

			httpBackend.expect('POST','http://localhost:3000/contacts')
				.respond(contact1);
				
			httpBackend.flush();
			
			expect(Flash.create).toHaveBeenCalledWith('success',successMessage,'custom-class');
			expect(Flash.create.calls.count()).toBe(1);
		});
		
		it('should call failed alert if save isnt fine', function() {
			scope.addContact(contact1);

			httpBackend.expect('POST','http://localhost:3000/contacts')
				.respond(500,'some server error');
				
			httpBackend.flush();
			
			expect(Flash.create).toHaveBeenCalledWith('danger',errMessage,'custom-class');
			expect(Flash.create.calls.count()).toBe(1);
		});
	
	});
	
	
});