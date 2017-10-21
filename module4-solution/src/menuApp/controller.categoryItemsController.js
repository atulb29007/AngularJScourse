(function (){
"use strict";

angular.module('menuApp')
.controller('categoryItemsController',categoryItemsController);

categoryItemsController.$inject('$stateParams');
function categoryItemsController ($stateParams){
  var items = this;
  items.categoryID = $stateParams.categoryID;
}

})();
