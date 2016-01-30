var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');


request("http://genius.com/Alesso-heroes-we-could-be-lyrics", function(err, response){
    var html = response.body;

// var html = fs.readFileSync('pokerface.html', 'utf8');

var $ = cheerio.load(html);

html = $('lyrics').html();

$ = cheerio.load(html);
var lyricsArr = [];
$('a').each(function(){
    lyricsArr.push( $(this).text() );
});
// console.log(lyricsArr);

for (var i = 0; i < lyricsArr.length; i++) {
    line = lyricsArr[i].replace(/[^A-Za-z\s-]|/g, "");
    line = line.replace(/\n|-/g, " ");
    line = line.split(" ");
    line = line.sort(function(a, b){
        return b.length - a.length;
    });

    console.log(line[0]);
}
});
