const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
// const url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/match?dogID=2
const matches = require('./mock-data/matches');

//MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://' +
  process.env.DB_USERNAME +
  ':' +
  process.env.DB_PASS +
  '@' +
  process.env.DB_HOST +
  '/' +
  process.env.DB_NAME +
  '/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// eslint-disable-next-line no-unused-vars
client.connect((err) => {
  const collection = client.db('PawDoption').collection('matches');
  console.log(collection);
  // client.close();
});

// port 3000
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

// Middleware
app.use(express.static('static')); // show static files on localhost
app.set('view engine', 'ejs'); // to use ejs
app.set('views, view');

// index page render
app.get('/', (req, res) => {
  res.render('pages/index');
});

// match page render
app.get('/match', (req, res) => {
  res.render('pages/match', {
    matches,
  });
});

// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const userMatches = matches.filter((match) => {
    // checking if filters are correct
    const ageMatches = req.body.age.includes(match.age);
    const sizeMatches = req.body.size.includes(match.size);
    const genderMatches = req.body.gender.includes(match.gender);

    //  with: console.log(ageMatches, sizeMatches, genderMatches); you'll see true or false.
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
