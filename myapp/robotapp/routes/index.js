var express = require('express');
var router = express.Router();
var r = require('rethinkdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function(req, res) {
  var connection = null;
  r.connect( {host: '127.0.0.1', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  });
  console.log(req.body);
  r.table('contact_form').insert(req.body);
  res.redirect('/thanks');
});

router.get('/thanks', function(req, res) {
  res.render('thanks');
});

module.exports = router;
