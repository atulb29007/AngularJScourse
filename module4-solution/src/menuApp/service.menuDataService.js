(function (){
"use strict";

angular.module('data')
.service('menuDataService',menuDataService)
.constant('APIbasePath','https://davids-restaurant.herokuapp.com');

menuDataService.$inject = ['APIbasePath','$http'];
function menuDataService (APIbasePath,$http){
  var service = this;

  service.getAllCategories = function(){
    var response = $http({
      method : 'GET',
      url : APIbasePath + '/categories.json'
    });
    return response;
  };

  service.getItemsForCategory = function(categoryShortName){
    var response = $http({
      method : 'GET',
      url : APIbasePath + '/menu_items.json?category=' + categoryShortName
    });
    return response;
  };

}

})();
