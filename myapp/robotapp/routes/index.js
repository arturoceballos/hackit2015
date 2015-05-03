var express = require('express');
var router = express.Router();
var r = require('rethinkdb');
var connection = null;
r.connect( {host: '127.0.0.1', port: 28015}, function(err, conn) {
  if (err) throw err;
  connection = conn;
});

var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function(req, res) {
  console.log(req.body);
  r.db('hackit_db').table('contact_form').insert(req.body).run(connection);
  res.redirect('/thanks');
});

router.get('/thanks', function(req, res) {
  res.render('thanks');
});

module.exports = router;
