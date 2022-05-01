const express = require('express');
const app = express();
const port = 3000;

// port 3000
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

// Middleware
app.use(express.static('static')); // show static files on localhost:3000
app.set('view engine', 'ejs'); // to use ejs
app.set('views, view');

// index page render
app.get('/index', function (req, res) {
  res.render('pages/index', {
    title: 'Gender?',
  });
});

// profile page render
app.get('/profile', function (req, res) {
  res.render('pages/profile', {
    // image: '',
    name: 'Charles',
    about: 'Charles is a fluffo doggo.',
    age: '2',
    gender: 'Male',
    size: 'Medium',
  });
});

// size page render
app.get('/size', function (req, res) {
  res.render('pages/size');
});

//Dummy page render                                ///// DELETE LATER
app.get('/dummy', function (req, res) {
  res.render('pages/dummy', {
    title: 'Gender?',
  });
});

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).send('Error 404: File not found');
});
