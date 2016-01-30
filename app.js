var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

var index = require('./routes/index');
app.use('/', index);

app.listen(8080, function(){
  console.log('listening on 8080');
});
