(function(){
  'use strict';

  angular.module('menuSearch',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .controller('foundItemsController',foundItemsController)
  .service('menuService',menuService)
  .directive('foundItems',foundItems);

  function foundItems (){
    var ddo = {
      templateUrl : 'foundItemsTemplate.html',
      scope : {
        foundItem : '=',
        onRemove : '&',
        notFound : '='
      },
      controller : 'foundItemsController',
      controllerAs : 'menu',
      bindToController : true
    };
    return ddo;
  };

  function foundItemsController (){
    var menu = this
  };

  NarrowItDownController.$inject = ['menuService'];
  function NarrowItDownController (menuService){
    var menu = this;
    menu.notFound = true;
    menu.showLoader = false;

    menu.removeItems = function(index){
      menu.found.splice(index,1);
    };

    menu.goSearch = function(){
      if (menu.searchTerm){
        menu.showLoader = true;
        var promise = menuService.getItems();
        promise
        .then(function (response){
          menu.items = response.data.menu_items;
          menu.found = [];
          var j=0;
          for(var i=0;i<(menu.items.length);i++){
            var itemToSearch = menu.items[i].description.toLowerCase();
            if (itemToSearch.indexOf(menu.searchTerm.toLowerCase()) != -1){
              menu.found[j] = menu.items[i];
              j++;
            }
          }
          if(menu.found.length){
            menu.notFound = false;
          }else{
            menu.notFound = true;
          }
          menu.showLoader = false;
        })
        .catch(function(error){
          console.log("Error occured during feching data through menuService");
        });
      }
      else{
        menu.found = [];
        menu.notFound = true;
      }
    };
  };

  menuService.$inject = ['$http'];
  function menuService($http){
    var service = this;

    service.getItems = function(){
      var response = $http({
        method : 'GET',
        url : "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      return response;
    };
  };

})();
