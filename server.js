const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});

app.use(express.static('static'));

// app.use (req,res) => {
//     res.status(404).send("Error 404: file not found");
// };
