'use strict';
describe('service: ContactsSrvc',function(){
	var mockContactResource; 
	var $httpBackend;
	var $rootScope;
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
	beforeEach(module('contactApp'));
	beforeEach(function(){
		angular.mock.inject(function($injector){
			$httpBackend = $injector.get('$httpBackend');
			$rootScope = $injector.get('$rootScope');
			mockContactResource = $injector.get('ContactsSrvc');			
		});	
	});
	describe('get', function(){
		it('it should call get with id ',inject(function(){
			$httpBackend.expectGET('http://localhost:3000/contacts/12345')
				.respond(contact1);
			var result = mockContactResource.get({'id':'12345'});
			$httpBackend.flush();
			expect(result.id).toEqual('12345');
		}));
	
	});
	describe('update', function(){
		it('it should call update with id  and Object',inject(function(){
			$httpBackend.expectPUT('http://localhost:3000/contacts/12345')
				.respond(contact1);
			var result = mockContactResource.update({'id':'12345'},contact1);
			$httpBackend.flush();
			expect(result.id).toEqual('12345');
		}));
	
	});
	describe('query', function(){
		it('it should call query ',inject(function(){
			$httpBackend.expectGET('http://localhost:3000/contacts')
				.respond([contact1]);
			var result = mockContactResource.query();
			$httpBackend.flush();
			expect(result[0].id).toEqual('12345');
		}));
	
	});
	describe('remove', function(){
		it('it should call remove with id ',inject(function(){
			$httpBackend.expectDELETE('http://localhost:3000/contacts/12345')
				.respond(contact1);
			var result = mockContactResource.remove({'id':'12345'});
			$httpBackend.flush();
			expect(result.id).toEqual('12345');
		}));
	
	});
	describe('save', function(){
		it('it should call save with object ',inject(function(){
			$httpBackend.expectPOST('http://localhost:3000/contacts')
				.respond(contact1);
			var result = mockContactResource.save(contact1);
			$httpBackend.flush();
			expect(result.id).toEqual('12345');
		}));
	
	});
});