(function (){
"use strict";

angular.module('menuSearch',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('menuSearchService',menuSearchService)
.directive('foundItems',FoundItems)
.constant('appBase',"https://davids-restaurant.herokuapp.com");

function FoundItems(){
  var ddo = {
    templateUrl :'foundItemsTemplate.html',
    scope : {
      foundItem : '=',
      onRemove : '&',
      notFound :'<'
    },
    controller : foundItemsDirectiveController,
    controllerAs : 'menu',
    bindToController:true
  };
  return ddo;
};

function foundItemsDirectiveController(){
  var menu = this;
};

NarrowItDownController.$inject = ['menuSearchService'];
function NarrowItDownController (menuSearchService){
  var menu = this;
  menu.notFound = false;
  menu.showLoader = false;

  menu.goSearch = function(){
    if(menu.searchTerm){
      menu.notFound = false;
      menu.showLoader = true;

      var promise = menuSearchService.getMenuItems();

      promise.then(function(response){
        menu.found = [];
        var j = 0;
        menu.items = response.data.menu_items;
        var length = menu.items.length;
        for(var i=0;i<length;i++){
          var searchFrom = menu.items[i].description.toLowerCase();
          var sThis = menu.searchTerm;
          var index = searchFrom.indexOf(sThis);

          if(index != -1){
            menu.found[j] = menu.items[i];
            j++;
          }
        }
        if(!menu.found.length){
          menu.notFound = true;
        }
        menu.showLoader = false;
      })
      .catch(function(error){
        console.log("Error Handling the Data from asynchronous Request of menuSearchService.getMenuItems()");
      });
    }
    else{
      menu.notFound = true;
      menu.found=[];
    }
  };

  menu.removeItems = function (ind){
    menu.found.splice(ind,1);
  };
};

menuSearchService.$inject = ['$http','appBase'];
function menuSearchService ($http,appBase){
  var service = this;

  service.getMenuItems = function(){
    var response = $http({
      method : "GET",
      url : (appBase + '/menu_items.json'),
    });
    return response;
  };
};

})();
