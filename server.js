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
    about: 'Charles is a fluffo doggo',
  });
});

// reponse 404 message when file not found
app.use((req, res) => {
  res.status(404).send('Error 404: File not found');
});

// // index page
// app.get('/index/', (req, res) => {
//   res.render('pages/index', { title: 'test????', message: 'test test test' });
// });
