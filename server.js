const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
// const url = require('url'); // hierdoor kan de URL uitgelezen worden http://localhost:3000/match?dogID=2
// const matches = require('./mock-data/matches'); //mock nu niet nodig
let db = null;

/////////////
// MongoDB //
/////////////
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

async function connectDB() {
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
  });
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}

///////////////
// port 3000 //
///////////////
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

////////////////
// Middleware //
////////////////
app.use(express.static('static')); // show static files on localhost
app.set('view engine', 'ejs'); // to use ejs
app.set('views, view');

///////////////////////
// index page render //
///////////////////////
app.get('/', (req, res) => {
  res.render('pages/index');
});

////////////////
// match page //
////////////////
app.get('/match', (req, res) => {
  res.render('pages/match');
});

/////////////////
// Form Filter //
/////////////////
// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  const query = { name: 'Luna' };
  const matches = await db.collection('matches').find(query, {}).toArray();

  // const userMatches = matches.filter((match) => {
  //   // checking if filters are correct
  //   const ageMatches = req.body.age.includes(match.age);
  //   const sizeMatches = req.body.size.includes(match.size);
  //   const genderMatches = req.body.gender.includes(match.gender);

  //   //  with: console.log(ageMatches, sizeMatches, genderMatches); you'll see true or false.
  //   // if true true true = return(show) only valid match
  //   if (ageMatches && sizeMatches && genderMatches) {
  //     return match;
  //   }
  // })
  console.log(query);
  console.log(matches);
  res.render('pages/match', { matches: matches });
});

/////////////////
// reponse 404 //
/////////////////
app.use((req, res) => {
  res.status(404).render('pages/404');
});

//await db.collection('matches').insertOne(match);
connectDB().then(console.log('we have a connection to mongo!'));
