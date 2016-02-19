var app = angular.module('LyricPic', []);

// dc6zaTOxFJmzC
// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

app.controller('main', ['$scope', '$http', function($scope, $http){
  $scope.searchArtist = '';
  $scope.searchSong = '';

  $scope.lines = [];
  $scope.words = [];
  $scope.pics = [];

  $scope.getLyrics = function(){
    var searchTerms = prepareString($scope.searchArtist, $scope.searchSong);
    var geniusUrl = 'http://genius.com/' + searchTerms + '-lyrics';
    $http.get('/lyrics?url='+ searchTerms + '-lyrics').then(function(response){
      var data = response.data;
      $scope.lines = data.lines;
      $scope.words = data.words;
      console.log($scope.words);
      getGifs($scope.words);
    });
  };
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
  function prepareString(artist, song){
    var dashArtist = artist.split(' ').join('-');
    var dashSong = song.split(' ').join('-');
    return dashArtist + '-' + dashSong;
  }
}]);
