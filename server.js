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
  res.render('pages/index');
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

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).render('pages/404');
});

// redirect pagina questonnaire naar matches
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Temporary data storage
const matchItems = [
  {
    id: 'female',
    name: 'gender',
  },
  {
    id: 'male',
    name: 'gender',
  },
  {
    id: 'zero-five',
    name: 'age',
  },
  {
    id: 'six-ten',
    name: 'age',
  },
  {
    id: 'ten-plus',
    name: 'age',
  },
  {
    id: 'small',
    name: 'size',
  },
  {
    id: 'medium',
    name: 'size',
  },
  {
    id: 'large',
    name: 'size',
  },
];

app.get('/', (req, res) => {
  res.render('form', {
    matchItems,
  });
});

app.post('/', (req, res) => {
  const { amounts, checked } = req.body;

  // check whether we have any checked entries first
  if (Array.isArray(checked)) {
    const selectedAmounts = checked.map((idName) => amounts[idName]);

    console.log(req.body);
    console.log(selectedAmounts);
  }
  // res.redirect('/');
  res.render('pages/match.ejs');
});

// // // test 2
// app.get('/', (req, res) => {
//   res.render('pages/index', { data: data });
// });

// app.get('/:id', (req, res, next) => {
//   const id = req.params.id;
//   const match = find(data, function (value) {
//     return value.id === id;
//   });

//   if (!match) {
//     next();
//     return;
//   }

//   res.render('pages/match.ejs', { data: data });
// });

// Access the parse results as request.body
// app.post('/', function (req, res) {
//   console.log(req.body);

//   res.render('pages/match.ejs');
// });
