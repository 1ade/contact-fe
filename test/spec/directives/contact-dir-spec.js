describe('Directive: contact', function() {

  beforeEach(module('contactApp'));
  beforeEach(module('templates'));
  var element;
  var scope;
  var contact = {firstname:'12345-firstname',
				lastname:'12345lastname',
				company:'12345-company',
				url:['http://a.b.c','http://x.y.z','http://e.f.g'],
				email:['a@b.c','x@y.z','d@e.f'],
				phone:['+11(99)9999-9999','+22(99)9999-9999'],
				address:[{'street1':'12345-street-1','street2':'12345-street2-1','city':'12345-city-1','country':'12345-country-1','zip':'12345-zip-1'},{'street1':'12345-street-2','street2':'12345-street2-2','city':'12345-city-2','country':'12345-country-2','zip':'12345-zip-2'}]};
  describe('set a contact object into page',function(){
  
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<contact-dir contact=contact ></contact-dir>');
		element = $compile(element)(scope);
		scope.contact = contact;
		scope.$digest();
	  }));
	it('should contain all attributes',function(){
		expect(contact.firstname).toBe(element.find('#firstname').val());
		var obj;
		for(prop in contact){
			obj = contact[prop];			
			if(!Array.isArray(obj)){
				expect(obj).toBe( element.find('#'+prop).val() );
			}			
		}
	});
	
	
  
  });
  
  describe('set an empty contact object into page',function(){
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<contact-dir contact=contact ></contact-dir>');
		element = $compile(element)(scope);
		scope.contact = {};
		scope.$digest();
	  }));
	it('should contain no attributes',function(){
		var obj;
		for(prop in contact){
			obj = contact[prop];			
			if(!Array.isArray(obj)){
				expect(element.find('#'+prop).val()).toEqual("");
			}			
		}
	});
  
  });
  
});