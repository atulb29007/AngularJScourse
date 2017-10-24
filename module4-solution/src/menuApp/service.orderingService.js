(function (){
"use strict";

angular.module('data')
.service('orderingService',orderingService)

// orderingService.$inject = [];
function orderingService (){
  var service = this;
  service.orders = [];

  service.orderItem = function(categoryItem,categorySN,size){
    var newOrder = categoryItem;
    newOrder.sizeOrdered = size;
    if (size == "small"){
      newOrder.orderPrice = categoryItem.price_small;
    }
    else {
      newOrder.orderPrice = categoryItem.price_large;
    }
    newOrder.categorySN = categorySN;
    newOrder.quantity = 1;
    service.orders.push(newOrder);
    console.log("item received by Service");
  };

  service.removeOrder = function(index){
    service.orders.splice(index,1);
  };
}

})();
