'use strict';
app.directive('contactsDir', function() { 
  return { 
    scope: {
	contacts:'='
	},
	link: function($scope){		
		//contact list filter
		$scope.filterFn = function(item){
			return (item.firstname && item.firstname!=='' && item.lastname && item.lastname!=='');
		};	
		
		$scope.delContact = function(id){
			$("#"+id).remove();
			$scope.$parent.delContact(id);
		};
	},
    templateUrl: 'scripts/directives/contactsDir.html' 
  };
});