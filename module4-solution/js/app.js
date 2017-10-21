(function (){
"use strict";

angular.module('menuApp',['ui.router']);

angular.module('menuApp')
.controller('homeController',homeController)
.controller('categoryController',categoryController)
.controller('categoryItemsController',categoryItemsController)
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url : '/',
      templateUrl : 'src/template.home.html',
	  controller : 'homeController as home'
    })
    .state('category',{
      url :'/categories',
      templateUrl : 'src/template.categories.html',
	  controller : 'categoryController as category'
    })
    .state('items',{
      url : '/items/{categoryID}',
      templateUrl : 'src/template.categoryItems.html',
	  controller : 'categoryItemsController as items'
    });
};

function homeController (){
  var home = this;
}

function categoryController (){
  var category = this;
}

categoryItemsController.$inject('$stateParams');
function categoryItemsController ($stateParams){
  var items = this;
  items.categoryID = $stateParams.categoryID;
}

})();
