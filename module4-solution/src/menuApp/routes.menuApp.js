(function (){
"use strict";

angular.module('menuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url : '/',
      templateUrl : 'src/menuApp/template.home.html',
	  controller : 'homeController as home'
    })
    .state('category',{
      url :'/categories',
      templateUrl : 'src/menuApp/template.categories.html',
	  controller : 'categoryController as category'
    })
    .state('items',{
      url : '/items/{categoryID}',
      templateUrl : 'src/menuApp/template.categoryItems.html',
	  controller : 'categoryItemsController as items'
    });
};

})();
