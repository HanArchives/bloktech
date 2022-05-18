const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
// const url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/match?dogID=2
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
  res.render('pages/index');
});

// match page render
app.get('/match', (req, res) => {
  // const q = url.parse(req.url, true).query;
  // // default
  // if (q.dogID == null) {
  //   q.dogID = 2;
  // }

  res.render('pages/match', {
    matches,
    // dogID: q.dogID,
  });
});

// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Temporary data storage
// const matchItems = [{}];

app.post('/', (req, res) => {
  // matchItems.push({
  //   gender: req.body.gender,
  //   age: req.body.age,
  //   size: req.body.size,
  // });

  // test
  const userMatches = matches.filter((match) => {
    // checking if filters are correct
    const ageMatches = req.body.age.includes(match.age);
    const sizeMatches = req.body.size.includes(match.size);
    const genderMatches = req.body.gender.includes(match.gender);

    // console.log(ageMatches, sizeMatches, genderMatches);
    // if true true true = return(show) only valid match
    if (ageMatches && sizeMatches && genderMatches) {
      return match;
    }
  });

  res.render('pages/match', { matches: userMatches });
});

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).render('pages/404');
});
