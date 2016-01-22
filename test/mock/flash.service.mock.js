angular.module('flashServiceMock', [])
  .provider('Flash', function() {
    this.$get = function() {		
      return {
        create: function(arg1,arg2,arg3) { return {};}
      };
    };
  });