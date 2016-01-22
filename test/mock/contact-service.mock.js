angular.module('contactServiceMock', [])
  .provider('ContactsSrvc', function() {
    this.$get = function() {
		var contact_1 = {
				id:'12345',
				firstname:'12345-firstname',
				lastname:'12345lastname',
				company:'12345-company',
				url:['http://a.b.c','http://x.y.z','http://e.f.g'],
				email:['a@b.c','x@y.z','d@e.f'],
				phone:['+11(99)9999-9999','+22(99)9999-9999'],
				address:[{"street1":"12345-street-1","street2":"12345-street2-1","city":"12345-city-1","country":"12345-country-1","zip":"12345-zip-1"},{"street1":"12345-street-2","street2":"12345-street2-2","city":"12345-city-2","country":"12345-country-2","zip":"12345-zip-2"}]
			};
		var contact_2 = {
				id:'78901',
				firstname:'78901-firstname',
				lastname:'78901-lastname',
				company:'78901-company',
				url:['http://a.b.c','http://x.y.z','http://e.f.g'],
				email:['a@b.c','x@y.z','d@e.f'],
				phone:['+11(99)9999-9999','+22(99)9999-9999'],
				address:[{"street1":"78901-street-1","street2":"78901-street2-1","city":"78901-city-1","country":"78901-country-1","zip":"78901-zip-1"},{"street1":"78901-street-2","street2":"78901-street2-2","city":"city-2","country":"country-2","zip":"zip-2"}]
			};
      return {
        get: function(id) { return contact_1;},
        save: function(object) { return contact_1;},
		query:function(){return [contact_1,contact_2];},
		update:function(id){return contact_1;},
		remove:function(id){return contact_1;}
      };
    };
  });