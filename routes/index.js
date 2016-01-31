var express = require('express');
var router = express.Router();
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');


router.get('/', function(req, res){
  res.render('index');
});

router.post('/', function(req, res){
    request(req.body, function(err, response){

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
    var words = [];
    for (var i = 0; i < lyricsArr.length; i++) {
        line = lyricsArr[i].replace(/[^A-Za-z\s-]|/g, "");
        line = line.replace(/\n|-/g, " ");
        line = line.split(" ");
        line = line.sort(function(a, b){
            return b.length - a.length;
        });

        words.push(line[0]);
    }
    });

    res.json({
        lines: lyricsArr,
        words: words
    });

});

module.exports = router;
