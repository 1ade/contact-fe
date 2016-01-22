'use strict';
app.directive('contactDir', function($compile,$timeout) { 
  return { 
    restrict: 'E',
	scope:{
		contact:'='
	},
    link: function($scope,$el){
			var photo = $el.find("#photo");
			var fileInput = $el.find("#fileInput");
			var picModal = $el.find("#picModal");
			var picModalContent = $el.find("#picModal .modal-content");
			var invokeUpload = function(){				
				fileInput.click();
			};
			photo.on('click',invokeUpload)			
			.hover(function(){
				$(this).addClass("mouseenter_photo");
				$(this).removeClass("mouseleave_photo");
			},function(){
				$(this).addClass("mouseleave_photo");
				$(this).removeClass("mouseenter_photo");
			});
			
			$scope.myImage='';
			$scope.myCroppedImage='';
			
			$timeout(function(){
				var photo_from_server = $scope.contact.photo;
				if(photo_from_server){
					photo.attr('src',photo_from_server);
				}			
				
			});
			
			var handleFileSelect=function(evt) {
				var replaceImg = '<img ng-src="{{myCroppedImage}}"  data-ng-model="contact.photo" id="photo"  class="round-placeholder"  holder-fix>';
				var compiledImg = $compile(replaceImg)($scope);
				compiledImg.on('click',invokeUpload);
				photo.replaceWith(compiledImg);
				
				//set cropped image to scope
				//$scope.selectedImg = myCroppedImage;
				var cropArea = $el.find(".cropArea");
				
				
				var file=evt.currentTarget.files[0];
				var reader = new FileReader();
				var image = new Image();
				reader.onload = function (evt) {
					
					$scope.$apply(function($scope){
						$scope.myImage=evt.target.result;
						image.src = evt.target.result;
						image.onload = function(){								
							cropArea.css({'min-width':this.width+'px','min-height':this.height+'px'});
							picModalContent.css({'min-width':(this.width*1.05)+'px'});
						};
						picModal.modal('show');
						
					});
				};
				console.dir(file);
			  reader.readAsDataURL(file);
			};
			fileInput.on('change',handleFileSelect);
  
		
	},
    templateUrl: 'scripts/directives/contactDir.html' 
  }; 
});