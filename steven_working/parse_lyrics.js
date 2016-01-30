var fs = require('fs');
var cheerio = require('cheerio');


var html = fs.readFileSync('pokerface.html', 'utf8');

var $ = cheerio.load(html);

html = $('lyrics').html();

$ = cheerio.load(html);
var lyricsArr = [];
$('a').each(function(){
    lyricsArr.push( $(this).text() );
});
console.log(lyricsArr);
