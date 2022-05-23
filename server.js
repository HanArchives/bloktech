const arrayify = require('array-back'); // make a single string an array{}
const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: './static/img' });
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
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

  console.log(uri);
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
////////////
// MULTER //
////////////
// const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/img'); // store here
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + file.originalname // giving name and original name
    );
  },
});

const upload = multer({
  //
  storage: storage,
});

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

////////////////
// Find doggo //
////////////////
app.get('/find-doggo', (req, res) => {
  res.render('pages/find-doggo');
});

//////////////////
// Likes render //
//////////////////
app.get('/likes', async (req, res) => {
  const likes = await db
    .collection('matches')
    .find({
      like: true,
    })
    .toArray();
  res.render('pages/likes', {
    likes,
  });
});

////////////////////////////
// Form Filter find doggo //
////////////////////////////
// Parse JSON bodies (as sent by API clients) (JS OBJECT MAKEN)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  // Selects the documents where the value of a field equals any value in the specified array.
  const queryGender = { gender: { $in: arrayify(req.body.gender) } };
  const querySize = { size: { $in: arrayify(req.body.size) } };
  const queryAge = { age: { $in: arrayify(req.body.age) } };
  const query = { ...queryGender, ...querySize, ...queryAge }; // make one object of three objects

  const matches = await db.collection('matches').find(query).toArray();
  res.render('pages/match', { matches });
});

///////////////
// Add Doggo //
///////////////
app.post('/doggo/add', upload.single('image'), async (req, res, next) => {
  // const finalImg = {
  //   path: req.file.path,
  // };

  let doggo = {
    image: req.file.filename,
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    size: req.body.size,
    about: req.body.about,
    like: false,
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

////////////////////////////
// Add doggo to favorites //
////////////////////////////
app.post('/likedoggo', async (req, res) => {
  await db.collection('matches').updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: {
        like: true,
      },
    }
  );

  res.redirect('/likes');
});

/////////////////////////////////
// remove doggo from favorites //
/////////////////////////////////
app.post('/removedoggo', async (req, res) => {
  await db.collection('matches').updateOne(
    {
      _id: ObjectId(req.body.remove),
    },
    {
      $set: {
        like: false,
      },
    }
  );

  res.redirect('/likes');
});

/////////////////
// reponse 404 //
/////////////////
app.use((req, res) => {
  res.status(404).render('pages/404');
});
