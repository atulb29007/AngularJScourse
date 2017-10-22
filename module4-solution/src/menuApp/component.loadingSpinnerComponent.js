(function (){
"use strict";

angular.module('loader')
.component('loadingSpinner', {
  templateUrl : 'src/menuApp/template.component.loading-spinner.html',
  controller : loadingSpinnerController
});

loadingSpinnerController.$inject = ['$rootScope'];
function loadingSpinnerController($rootScope){
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      $ctrl.loaderVisibility = true;
    });
    cancellers.push(cancel);

    var cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      $ctrl.loaderVisibility = false;
    });
    cancellers.push(cancel);

    var cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      $ctrl.loaderVisibility = false;
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function(){
    cancellers.foreach(function(item){
      item();
    });
  };

};

})();
