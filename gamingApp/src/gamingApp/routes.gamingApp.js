(function (){
"use strict";

angular.module('gamingApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url : '/',
      templateUrl : 'src/gamingApp/template.view.home.html',
	    controller : 'homeController as home'
    })
    .state('games',{
      url : '/games',
      templateUrl : 'src/gamingApp/template.view.games.html',
	    controller : 'gamesController as games',
      resolve : {
        gamesData : ['gamingDataService',function(gamingDataService){
          var data = gamingDataService.getAllGames();
          return data;
        }]
      }
    });
};

})();
