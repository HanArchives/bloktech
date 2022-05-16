const { match } = require('assert');
const express = require('express');
const app = express();
const port = 3000;
const url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/match?dogID=2
const matches = require('./mock-data/matches');

// port 3000
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

// Middleware
app.use(express.static('static')); // show static files on localhost
app.set('view engine', 'ejs'); // to use ejs
app.set('views, view');

// index page render
app.get('/index', (req, res) => {
  res.render('pages/index', { matchItems: matchItems });
});

// match page render
app.get('/match', (req, res) => {
  const q = url.parse(req.url, true).query;
  // default waarde geven
  if (q.dogID == null) {
    q.dogID = 2;
  }

  res.render('pages/match', {
    matches,
    dogID: q.dogID,
  });
});

// TEST //
// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Temporary data storage
const matchItems = [{}];

// const findMatch = (age, gender, size) => {
//   matches.filter((match) => {
//     return match.age == age && match.size == size && match.gender == gender;
//   });
// };

app.post('/', (req, res) => {
  // console.log(req.body);

  matchItems.push({
    gender: req.body.gender,
    age: req.body.age,
    size: req.body.size,
  });

  // const age = req.body.age;
  // const size = req.body.size;
  // const gender = req.body.gender;

  // findMatch(age, gender, size);

  console.log(
    matches.filter((match) => {
      return (
        match.age == req.body.age &&
        match.size == req.body.size &&
        match.gender == req.body.gender
      );
    })
  );
  res.redirect('/match');
});

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).render('pages/404');
});
