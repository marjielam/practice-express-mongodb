const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var db;

MongoClient.connect('mongodb://marjie:fiestaparrot@ds113580.mlab.com:13580/practice-express-mongodb', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});


app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function (err, results) {
    console.log(results);
    res.render('index.ejs', { quotes: results });
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});
