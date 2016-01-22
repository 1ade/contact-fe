'use strict';

/**
 * @ngdoc function
 * @name contactApp.directive:addphonenoDir
 * @description
 * # addphonenoDir
 * Directive of the contactApp
 */
app.directive('addphonenoDir', function($http,$compile,$timeout){
	return{
		
		scope: {
			contact: '='
		},
		link: function($scope,$el){
			function showPhoneForm(){
					$http.get("scripts/directives/phonenoDir.html").then(function(resp){
						var data = $(resp.data);
						data.find(".do-delete").on("click",{class: ".del-buttns"},showHide);
						data.find(".return").on("click",{class: ".label-action"},showHide);
						
						if(!$scope.phoneno_count) $scope.phoneno_count = 0;
						var input = data.find("#phone");
						input.attr("data-ng-model","contact.phone["+ $scope.phoneno_count++ + "]");
						
						data.find(".del-but").click(function(){						
							data.remove();
							var index = $scope.contact.phone.indexOf(input.val());
							if(index !== -1){
								$scope.contact.phone.splice(index,1);
							}
							
						});
						
						$($el).prepend($compile(data)($scope));
						
						
					});
				
			}
			
			$timeout(function(){
				console.log("phone in directive "+ JSON.stringify($scope.contact.phone));
				$.each( $scope.contact.phone, function( ) {
					showPhoneForm();
				});
			});
			
			$el.find(".add-more").click(function(){
				showPhoneForm();
			});
			
		},
		templateUrl: 'scripts/directives/addphonenoDir.html',
	};
});