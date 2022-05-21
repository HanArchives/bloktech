const arrayify = require('array-back'); // make a single string an array{}
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './static/img' });
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
app.get('', (req, res) => {
  res.render('pages/index');
});

////////////////
// Match page //
////////////////
app.get('/match', (req, res) => {
  res.render('pages/match');
});

///////////////
// Add doggo //
///////////////
app.get('/add-doggo', (req, res) => {
  res.render('pages/add-doggo');
});

///////////////
// Find doggo //
///////////////
app.get('/find-doggo', (req, res) => {
  res.render('pages/find-doggo');
});

////////////////////////////
// Form Filter find doggo //
////////////////////////////
// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  // console.log(arrayify(req.body.gender));
  const queryGender = { gender: { $in: arrayify(req.body.gender) } };
  const querySize = { size: { $in: arrayify(req.body.size) } };
  const queryAge = { age: { $in: arrayify(req.body.age) } };
  const query = { ...queryGender, ...querySize, ...queryAge }; // make one object of three objects

  const matches = await db.collection('matches').find(query).toArray();
  console.log(matches);
  res.render('pages/match', { matches });
});

///////////////
// Add Doggo //
///////////////
app.post('/doggo/add', upload.single('image'), async (req, res) => {
  let doggo = {
    image: req.body.image,
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    size: req.body.size,
    about: req.body.about,
    like: req.body.like,
  };
  // ADD TO DB
  await db.collection('matches').insertOne(doggo);

  // GET LATEST LIST OF MATCHES
  const query = {};
  const matches = await db.collection('matches').find(query, {}).toArray();

  // RENDER PAGE
  // const title = 'Succesfully added doggo';
  // res.render('pages/match', { title, matches });
});

// Checking connection with DB
connectDB().then(console.log('we have a connection to mongo!'));

/////////////////
// reponse 404 //
/////////////////
app.use((req, res) => {
  res.status(404).render('pages/404');
});
