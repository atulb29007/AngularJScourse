(function (){
'use strict';

angular.module('lunchChecker',[])

.controller('lunchMenu',checkMyLunch);

checkMyLunch.$inject = ['$scope'];

function checkMyLunch($scope){
  $scope.lunchItems = "";

  $scope.countingItems = function(){
    var str = $scope.lunchItems;
    var re = /\s*,\s*/;
    var separateLunchItems = str.split(re);

    var count=0;

    for (var i=0;i<separateLunchItems.length;i++){
        separateLunchItems[i] = separateLunchItems[i].replace(/\s/g,'');
        if(separateLunchItems[i]!==""){
          count++;
        }
    }
    if(count==0){
      $scope.lunchMessage = "Plase enter the data first!";
      $scope.lunchClass = "red";
    }
    else{
      $scope.lunchClass = "green";
      if(count<=3){
        $scope.lunchMessage = "enjoy!";
      }
      else{
        $scope.lunchMessage = "Too much!";
      }
    }
  };

}

})();
