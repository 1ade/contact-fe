'use strict';

/**
 * @ngdoc overview
 * @name contactApp
 * @description
 * # contactApp
 *
 * Main module of the application.
 */
//if (Meteor.isClient) {
var app = angular
  .module('contactApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ngImgCrop',
	'flash'
  ]);
  //holder.js hack https://github.com/imsky/holder/pull/26
	app.directive('holderFix', function () {
		return {
			link: function (scope, element) {
				Holder.run({ images: element[0], nocss: true });
			}
		};
	});

  app.config(['$routeProvider','$httpProvider',function ($routeProvider,$httpProvider) {
	
	$httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
	
    $routeProvider
      .when('/', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsController',
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsController'
      })
	  .when('/contact/:id?', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
//}