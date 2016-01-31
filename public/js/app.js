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

  $scope.lines = [];
  $scope.words = [];

  $scope.getLyrics = function(){
    var searchTerms = prepareString($scope.searchArtist, $scope.searchSong);
    var geniusUrl = 'http://genius.com/' + searchTerms + '-lyrics';
    $http.post('http://localhost:8080/', geniusUrl).then(function(response){
      console.log(response);
    });
  };

  function parseLyrics(response){
    $http.post('http://localhost:8080/', response).then(function(data){
      console.log('response from localhost:' + data);
      $scope.lines = data.lines;
      $scope.words = data.words;
    });
  }

  function prepareString(artist, song){
    var dashArtist = artist.split(' ').join('-');
    var dashSong = song.split(' ').join('-');
    return dashArtist + '-' + dashSong;
  }
}]);
