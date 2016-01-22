'use strict';
app.directive('addurlDir', function($http,$compile,$timeout){
	return{
		scope: {
			contact: '='
		},
		link: function($scope,$el){
			function showUrlForm(){
				$http.get("scripts/directives/urlDir.html").then(function(resp){
					var data = $(resp.data);
					data.find(".do-delete").on("click",{class: ".del-buttns"},showHide);
					data.find(".return").on("click",{class: ".label-action"},showHide);
					
					if(!$scope.url_count) $scope.url_count = 0;
					
					
					var input = data.find("#url");
					input.attr("data-ng-model","contact.url["+ $scope.url_count++ + "]");
					
					data.find(".del-but").click(function(){						
						data.remove();
						var index = $scope.contact.url.indexOf(input.val());
						if(index !== -1){
							$scope.contact.url.splice(index,1);
						}
					});
					
					$($el).prepend($compile(data)($scope));
					
				});
			}
			
			$timeout(function(){
				console.log("url in directive "+ JSON.stringify($scope.contact.url));
				$.each( $scope.contact.url, function() {
					showUrlForm();
				});
				
			});
			$el.find(".add-more").click(function(){
				showUrlForm();				
			});
		},
		templateUrl: 'scripts/directives/addurlDir.html'		
	};
});