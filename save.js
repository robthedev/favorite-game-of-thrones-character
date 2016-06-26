var express = require('express');
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://rob:password404@ds015584.mlab.com:15584/sw-quotes', function (err, database) {
  
  if (err) return console.log(err);

  db = database;

  app.listen(3000, function() {
		console.log('listening on 3000');
	});
});


app.get('/', function(req, res)  {
  db.collection('quotes').find().toArray(function (err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {quotes: result});
  });
});

app.put('/quotes', function(req, res) {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Master Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, function (err, result) {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/quotes', function(req, res) {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, 
  function(err, result) {
    if (err) return res.send(500, err);
    res.json('A darth vadar quote got deleted');
  });
});

app.post('/quotes', function(req, res) {
	db.collection('quotes').save(req.body, function(err, result) {
		if (err) return console.log(err);

		console.log('saved to database');
    	res.redirect('/');
	});
});	



var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function () {
   fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  }).then(function(res)  {
      if (res.ok) return res.json();
  }).then(function(data) {
      window.location.reload(true);
  });
});

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  }).then(function(res) {
    if (res.ok) return res.json(); 
  }).then(function(data) {
  window.location.reload();
  });
});



var names_array = [];
result.forEach( function (obj){
    var character_name = obj.name;
    names_array.push(character_name);
});
mostFrequent(names_array);