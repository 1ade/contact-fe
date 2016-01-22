'use strict';

/**
 * @ngdoc function
 * @name contactApp.service:contactsSrvc
 * @description
 * # contactsSrvc
 * Service of the contactApp
 */
app.factory('ContactsSrvc',['$resource' ,'$http', function($resource,$http){
	var ContactsService = {};
	var contact_rest_api_host = "http://localhost:3000";
	return $resource(contact_rest_api_host+'/contacts/:id',{id:'@_id'},{
		'update': {method:'PUT'},
		'query': { method: "GET", isArray: true }
	});
}]);