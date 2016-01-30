var app = angular.module('LyricPic', []);

var words = ['lebowski', 'finding nemo', 'john oliver', 'freakazoid'];

app.controller('renderPics', ['$scope', '$http', function($scope, $http){
  $scope.pics = [];
  function getGifs(words){
    words.forEach(function(word){
      $http.get('http://api.giphy.com/v1/gifs/search?q='+ word +'&api_key=dc6zaTOxFJmzC').then(function(response){
        var data = response.data.data;
        var oneResult = data[0];
        var picUrl = oneResult.images.original.url;
        $scope.pics.push(picUrl);
      });
    });
  }
    function init(){
      getGifs(words);
    }

    init();


}]);

// dc6zaTOxFJmzC
// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

app.controller('main', ['$scope', '$http', function($scope, $http){
  $scope.searchArtist = '';
  $scope.searchSong = '';

  $scope.getLyrics = function(){
    var urlString = prepareString($scope.searchArtist, $scope.searchSong);
    $http.get('http://genius.com/' + urlString + '-lyrics').then(function(response){
      console.log('' + response);
    });
  };

  function prepareString(artist, song){
    var dashArtist = artist.split(' ').join('-');
    var dashSong = song.split(' ').join('-');
    return dashArtist + '-' + dashSong;
  }
}]);