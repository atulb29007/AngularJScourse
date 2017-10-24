(function (){
"use strict";

angular.module('menuApp')
.controller('categoryItemsController',categoryItemsController);

categoryItemsController.$inject = ['categoryItemsData','$stateParams','orderingService'];
function categoryItemsController (categoryItemsData,$stateParams,orderingService){
  var items = this;

  items.categorySN = $stateParams.categorySN;
  items.categoryName = $stateParams.categoryN;
  items.categoryItems = categoryItemsData;

  items.orderThisItem = function(categoryItem,categorySN,size){
    console.log("item ordered");
    orderingService.orderItem(categoryItem,categorySN,size);
  };
}

})();
