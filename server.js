const express = require('express');
const app = express();
const port = 3000;
const matches = require('./data/matches');
let url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/profile?dogID=2
//const { identity } = require('lodash');

// port 3000
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

// Middleware
app.use(express.static('static')); // show static files on localhost
app.set('view engine', 'ejs'); // to use ejs
app.set('views, view');

// index page render
app.get('/index', function (req, res) {
  res.render('pages/index');
  // res.render('pages/index', {
  //   title: 'Gender?',
  // });
});

// profile page render
app.get('/profile', function (req, res) {
  let q = url.parse(req.url, true).query;
  // default waarde geven
  if (q.dogID == null) {
    q.dogID = 2;
  }

  res.render('pages/profile', {
    matches: matches,
    dogID: q.dogID,
  });
});

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).send('Error 404: File not found');
});
