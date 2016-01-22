'use strict';
var showHide = function(event) {
    var parent = $(this).parent();
    parent.hide(100, function() {
      var toShow = (event.data.class === ".del-buttns") ? parent.siblings().last() : parent.siblings().first();
      toShow.show(100);
    });
};

