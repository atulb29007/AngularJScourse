(function (){
"use strict";

angular.module('gamingApp')
.controller('gamesController',gamesController);

gamesController.$inject = ['gamesData','$filter'];
function gamesController (gamesData,$filter){
  var games = this;

  games.$onInit = function(){
    games.allgames = gamesData.data;   //Recieving list of all games
    games.apiRateLimit = games.allgames[0];

    games.allGames = games.allgames.splice(1,games.allgames.length-1);  // This will be treated as original
    games.sortedGames = games.allGames;  // This will be modified to display

    games.platforms = [];  // Array used to show all Platforms so user can sort throught them
    var plats = "";
    var platsstripped = "";
    for (var i=1 ; i<games.allGames.length ;i++){
      plats = games.allGames[i].platform;
      if (!(games.platforms.includes(plats)) && plats){
        games.platforms.push(plats);
      }
    }
    games.genres = []; // Array used to show all genres so user can sort throught them
    for (var i=0 ; i<games.allGames.length ;i++){
      var genre = [];
      genre = (games.allGames[i].genre).split(', ');
      games.sortedGames[i].pic = genre[0] + 'Genre';
      for(var j=0;j<genre.length;j++){
        if ((!(games.genres.includes(genre[j]))) && (genre[j])){
          games.genres.push(genre[j]);
        }
      }
    }
  };

  games.searchTerm = '';   // Term typed by the user in input field
  //  Function that shows search suggestions
  games.searchGame = function(Splatform){
    if (games.searchTerm){
      games.searchShow = true;    // If 'true' this variable show suggestion list
    }else{
      games.searchShow = false;    // If 'true' this variable show suggestion list
    }
    games.sortedGames = games.allGames;
    games.sortedGames = games.sortedGames.filter(function(item){
      if (item.title.toLowerCase().indexOf(games.searchTerm.toLowerCase()) != -1){
        return item;
      }
    });
    // Below 'if' condition shows final result when user clicks on one of the suggestions
    if(Splatform){
      games.sortedGames = games.sortedGames.filter(function(item){
        if (item.title.toLowerCase() == games.searchTerm.toLowerCase()){
          if (item.platform == Splatform){
            return item;
          }
        }
      });
    }
  }
  // Next function handles autocompletion (when user clicks one of the suggestions)
  games.autoComplete = function (term,platform){
    games.searchTerm = term;
    games.searchGame(platform);
    games.searchShow = false;
  }

  // Next three variables are sorting parameter
  games.scoreSort = 'not set';
  games.platformIndex = -1;
  games.genreIndex = -1;
  var platf = '';
  var genref= '';

  // This function handles sorting using sorting parameters
  games.gameSorter = function(){
    games.sortedGames = games.allGames;
    if(games.platformIndex >= 0){
      platf = games.platforms[games.platformIndex];
      games.sortedGames = games.sortedGames.filter(function(item){
        if (item.platform == platf){
          return item;
        }
      });
    }
    if(games.genreIndex >= 0){
      genref = games.genres[games.genreIndex];
      games.sortedGames = games.sortedGames.filter(function(item){
        if (item.genre.indexOf(genref) != -1){
          return item;
        }
      });
    }
    if (games.scoreSort != 'not set'){
      games.sortedGames = $filter('orderBy')(games.sortedGames, 'score', games.scoreSort);
    }
  };
  // When user deciced to sort existing results according to the score
  games.sortByScore = function(order){
    games.scoreSort = order;
    games.gameSorter();
  };
  // When user deciced to sort existing results according to the platform
  games.sortByPlatform = function(index){
    games.platformIndex = index;
    games.gameSorter();
  };
  // When user deciced to sort existing results according to the genre
  games.sortByGenre = function(index){
    games.genreIndex = index;
    games.gameSorter();
  };
  // Next function clears sorting parameters and results are reverted back to original
  games.sortClear = function(index){
    var radioToClear = '';
    if(index.includes(1)){
      radioToClear = "score";
      games.scoreSort = 'not set';
    }
    if (index.includes(2)){
      radioToClear = "platform";
      games.platformIndex = -1;
    }
    if(index.includes(3)){
      radioToClear = "genre";
      games.genreIndex = -1;
    }
    var radios = document.getElementsByName(radioToClear);
    for(var k=0 ; k<radios.length ; k++){
      radios[k].checked = false;
    }
    games.gameSorter();
  };

}

})();
