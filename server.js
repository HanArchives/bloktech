const arrayify = require('array-back'); // make a single string an array
const express = require('express');
const multer = require('multer');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
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

// Checking connection with DB
connectDB().then(console.log('we have a connection to mongo!'));

////////////
// MULTER //
////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/img/dogs'); // store here
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
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

/////////////////////
// Pages rendering //
/////////////////////
// Index page //
app.get('/', (req, res) => {
  res.render('pages/index');
});

// Match page //
app.get('/match', (req, res) => {
  res.render('pages/match');
});

// Redirect page //
app.get('/redirect', (req, res) => {
  res.render('pages/redirect');
});

// Add doggo page //
app.get('/add-doggo', (req, res) => {
  res.render('pages/add-doggo');
});

// Find doggo page //
app.get('/find-doggo', (req, res) => {
  res.render('pages/find-doggo');
});

// Likes page //
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
// Parse JSON bodies (as sent by API clients) (It's making a JS object)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  // $in selects the documents where the value of a field equals any value in the specified array.
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
});

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
// Remove doggo from favorites //
/////////////////////////////////
app.post('/remove-favorite', async (req, res) => {
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

////////////////////////
// DELETE DOG FROM DB //
////////////////////////
app.post('/delete', async (req, res) => {
  await db.collection('matches').deleteOne({
    _id: ObjectId(req.body.delete),
  });

  res.redirect('/redirect');
});

/////////////////
// reponse 404 //
/////////////////
app.use((req, res) => {
  res.status(404).render('pages/404');
});
