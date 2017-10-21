(function (){
"use strict";

angular.module('menuApp')
.controller('categoryController',categoryController);

categoryController.$inject = ['categoriesData'];
function categoryController (categoriesData){
  var category = this;

  category.categories = categoriesData.data;
}

})();
