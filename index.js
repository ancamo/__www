var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000, function(err){
  if (err) return console.log("the server have a problem"), process.exit(1);

  console.log("application is avialable at http://localhost:3000");
})