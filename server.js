
var express = require('express');
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
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
  db.collection('gotchar').find().toArray(function (err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {gotchar: result});

  });
});

app.delete('/gotchar', function(req, res) {
  db.collection('gotchar').remove(

    {_id: new mongodb.ObjectID(req.body._id)},
     
  function(err, result) {
    if (err) return res.send(500, err);
    res.json('Entry deleted');
  });
});


app.post('/gotchar', function(req, res) {
	db.collection('gotchar').save(req.body, function(err, result) {
		if (err) return console.log(err);

		console.log('saved to database');
    	res.redirect('/');
	});
});	



