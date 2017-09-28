(function (){
  "use strict";

  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "chips", quantity: 5 },
    { name: "pepto bismol", quantity: 4 },
    { name: "peanuts", quantity: 2 },
    { name: "kitkat chocolates", quantity: 6 }
  ];

  angular.module('shoppingBag',[])
  .controller('toBuyListController',toBuyListController)
  .controller('boughtListController',boughtListController)
  .service('shoppingService', shoppingService);

  toBuyListController.$inject = ['shoppingService'];
  function toBuyListController (shoppingService){
    var toBuyList = this;

    toBuyList.itemsToBuy = shoppingService.showList();

    toBuyList.buyItem = function (index){
        shoppingService.purchasing(index);
    }
  }

  boughtListController.$inject = ['shoppingService'];
  function boughtListController (shoppingService){
    var boughtList = this;

    boughtList.boughtItems = shoppingService.showpurchases();

    // toBuyList.buyItem = function (index){
    //     shoppingService.purchasing(index);
    // }
  }

  function shoppingService() {
    var service = this;
    var shoppingList = itemsToBuy;
    var inventory = [];

    service.purchasing = function (index){
      var justBought = shoppingList[index];
      shoppingList.splice(index,1);
      inventory.push(justBought);
    }

    service.showList = function (){
      return shoppingList;
    }

    service.showpurchases = function(){
      return inventory;
    }
  }

})();
