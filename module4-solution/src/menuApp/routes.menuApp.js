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
      templateUrl : 'src/menuApp/template.view.home.html',
	    controller : 'homeController as home'
    })
    .state('category',{
      url :'/categories',
      templateUrl : 'src/menuApp/template.view.categories.html',
	    controller : 'categoryController as category',
      resolve : {
        categoriesData : ['menuDataService',function(menuDataService){
          return menuDataService.getAllCategories();
        }]
      }
    })
    .state('items',{
      url : '/items/{categorySN}',
      templateUrl : 'src/menuApp/template.view.categoryItems.html',
	    controller : 'categoryItemsController as items',
      resolve : {
        categoryItemsData : ['$stateParams','menuDataService',function($stateParams,menuDataService){
          return menuDataService.getItemsForCategory($stateParams.categorySN)
            .then(function(response){
              return response.data.menu_items;
            });
        }]
      },
      params : {
        categoryN : null
      }
    })
    .state('orders',{
      url : '/orders',
      templateUrl : 'src/menuApp/template.view.orders.html',
	    controller : 'ordersController as orders',
      resolve : {
        ordersData : ['orderingService',function(orderingService){
          return orderingService.orders;
        }]
      }
    });
};

})();
