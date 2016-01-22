'use strict';

/**
 * @ngdoc function
 * @name contactApp.directive:addaddressDir
 * @description
 * # addaddressDir
 * Directive of the contactApp
 */
app.directive('addaddressDir', function($http,$compile,$timeout){
	return{
		scope: {
			contact: '='
		},
		link: function($scope,$el){
			function showAddressForms(){
				$http.get("scripts/directives/addressDir.html").then(function(resp){
					var data = $(resp.data);
					data.find(".do-delete").on("click",{class: ".del-buttns"},showHide);
					data.find(".return").on("click",{class: ".label-action"},showHide);
					
					if(!$scope.address_count) $scope.address_count = 0;
					
					data.find("#street1").attr("data-ng-model","contact.address["+ $scope.address_count +"].street1");
					data.find("#street2").attr("data-ng-model","contact.address["+ $scope.address_count +"].street2");
					data.find("#city").attr("data-ng-model","contact.address["+ $scope.address_count +"].city");
					data.find("#zip").attr("data-ng-model","contact.address["+ $scope.address_count +"].zip");
					data.find("#country").attr("data-ng-model","contact.address["+ $scope.address_count + "].country");
					
					$scope.address_count++;
					
					$($el).prepend($compile(data)($scope));
					
					data.find(".del-but").click(function(){						
						data.remove();
					});
				});
			}
			
			$timeout(function(){
				console.log("address in directive "+ JSON.stringify($scope.contact.address));
				$.each( $scope.contact.address, function( ) {
					showAddressForms();
				});
			});
			
			$el.find(".add-more").click(function(){
				showAddressForms();
				
			});
		},
		templateUrl: 'scripts/directives/addaddressDir.html'		
	};
});