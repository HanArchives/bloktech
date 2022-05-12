const express = require('express');
const app = express();
const port = 3000;
const matches = require('./mock-data/matches');
let url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/match?dogID=2
const { application } = require('express');
const req = require('express/lib/request');

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
});

// match page render
app.get('/match', function (req, res) {
  let q = url.parse(req.url, true).query;
  // default waarde geven
  if (q.dogID == null) {
    q.dogID = 2;
  }

  res.render('pages/match', {
    matches: matches,
    dogID: q.dogID,
  });
});

// redirect pagina questonnaire naar matches
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/:id', (req, res, next) => {
// const id = req.params.id;
// const movie = find(date,function (value)
// });

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).render('pages/404');
});
