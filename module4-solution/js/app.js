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
      templateUrl : 'templates/template.home.html'
    })
    .state('category',{
      url :'/categories',
      templateUrl : 'templates/template.categories.html'
    })
    .state('items',{
      url : '/items/{categoryID}',
      templateUrl : 'templates/template.categoryItems.html',
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
