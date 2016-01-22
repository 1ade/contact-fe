'use strict';

/**
 * @ngdoc function
 * @name contactApp.directive:addemailDir
 * @description
 * # addemailDir
 * Directive of the contactApp
 */
app.directive('addemailDir', function($http,$compile,$timeout){
	return{
		scope: {
			contact: '='
		},
		link: function($scope,$el,$attr){
			function showEmailForms(){
				$http.get("scripts/directives/emailDir.html").then(function(resp){
					var data = $(resp.data);
					data.find(".do-delete").on("click",{class: ".del-buttns"},showHide);
					data.find(".return").on("click",{class: ".label-action"},showHide);
					
					if(!$scope.email_count) $scope.email_count = 0;
					var input = data.find("#email");
					input.attr("data-ng-model","contact.email["+ $scope.email_count++ + "]");
					
					$($el).prepend($compile(data)($scope));
					data.find(".del-but").click(function(){						
						data.remove();
						
						var index = $scope.contact.email.indexOf(input.val());
						if(index !== -1){
							$scope.contact.email.splice(index,1);
						}
						
					});
					
				});
			}
			
			$timeout(function(){
				console.log("email in directive "+ JSON.stringify($scope.contact.email));
				$.each( $scope.contact.email, function( ) {
					showEmailForms();
				});
			});
			
			$el.find(".add-more").click(function(){
				showEmailForms();
				
			});
		},
		templateUrl: 'scripts/directives/addemailDir.html'		
	};
});