(function (){
"use strict";

angular.module('menuApp')
.controller('categoryItemsController',categoryItemsController);

categoryItemsController.$inject = ['categoryItemsData','$stateParams'];
function categoryItemsController (categoryItemsData,$stateParams){
  var items = this;

  items.categorySN = $stateParams.categorySN;
  items.categoryItems = categoryItemsData;
}

})();
