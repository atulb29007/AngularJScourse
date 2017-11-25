(function (){
"use strict";

angular.module('data')
.service('gamingDataService',gamingDataService)
.constant('APIbasePath','http://starlord.hackerearth.com/gamesarena');

gamingDataService.$inject = ['APIbasePath','$http'];
function gamingDataService (APIbasePath,$http){
  var service = this;

  //service.getAllGames = function(){
  //  var response = $http({
  //    method : 'GET',
  //    url : APIbasePath
  //  });
  //  return response;
  //};
   service.getAllGames = function(){
     var response = $http.get('src/gamingApp/useless/gamesarena.json').success(function(res){
         return res;
     });
     return response;
   };
}

})();
