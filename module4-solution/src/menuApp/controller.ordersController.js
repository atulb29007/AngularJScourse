(function (){
"use strict";

angular.module('menuApp')
.controller('ordersController',ordersController);

ordersController.$inject = ['ordersData','orderingService'];
function ordersController (ordersData,orderingService){
  var orders = this;

  orders.ordersList = ordersData;
  orders.bagTotal = 0;
  orders.bagDiscount = 0;
  orders.bagDiscountPer = 0.05;
  orders.bagTax = 0;
  orders.bagTaxPer = 0.2;
  orders.delieveryCharges = 0.5;
  orders.orderTotal = 0;

  orders.bagTotalCalc = function (prevV,incV,sign){
    var num = prevV + (sign*(incV));
    var newV = Math.round((num + 0.00001)*100)/100;
    orders.bagTotal = newV;

    var num = (orders.bagDiscountPer)*(orders.bagTotal);
    var newV = Math.round((num + 0.00001)*100)/100;
    orders.bagDiscount = newV;

    var num = (orders.bagTaxPer)*(orders.bagTotal);
    var newV = Math.round((num + 0.00001)*100)/100;
    orders.bagTax = newV;

    var num = orders.bagTotal + orders.bagDiscount + orders.bagTax + orders.delieveryCharges;
    var newV = Math.round((num + 0.00001)*100)/100;
    orders.orderTotal = newV;
  };

  orders.ordersList.forEach(function (item){
    orders.bagTotalCalc(orders.bagTotal,item.orderPrice,+1)
  });

  orders.removeOrder = function(index){
    var ele = orders.ordersList[index];
    orders.bagTotalCalc(orders.bagTotal,ele.orderPrice,-1)
    orderingService.removeOrder(index);
  };

  orders.decQty = function(index){
    var ele = orders.ordersList[index];
    if(ele.quantity > 1){
      ele.quantity = ele.quantity-1;
      if (ele.sizeOrdered == "small"){
        var num = ele.orderPrice - orders.ordersList[index].price_small;
        ele.orderPrice = Math.round((num + 0.00001) * 100)/100;
        orders.bagTotalCalc(orders.bagTotal,ele.price_small,-1)
      }
      else {
        var num = ele.orderPrice - ele.price_large;
        ele.orderPrice = Math.round((num + 0.00001) * 100)/100;
        orders.bagTotalCalc(orders.bagTotal,ele.price_large,-1)
      }
    }
  };

  orders.incQty = function(index){
    var ele = orders.ordersList[index];
    ele.quantity = ele.quantity+1;
    if (ele.sizeOrdered == "small"){
      var num = ele.orderPrice + ele.price_small;
      ele.orderPrice = Math.round((num + 0.00001) * 100)/100;
      orders.bagTotalCalc(orders.bagTotal,ele.price_small,+1)
    }
    else {
      var num = ele.orderPrice + ele.price_large;
      ele.orderPrice = Math.round((num + 0.00001) * 100)/100;
      orders.bagTotalCalc(orders.bagTotal,ele.price_large,+1)
    }
  };
}

})();
