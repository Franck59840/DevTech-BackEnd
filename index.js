const express = require('express');
const cors = require('cors');
const connection = require('./db-config');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5050;

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});
app.post('/users', (req, res) => {
  const { nameHeroes } = req.body;
  connection.query(
    'INSERT INTO users(nameHeroes) VALUES (?)',
    [nameHeroes],
    (err) => {
      if (err) {
        res.status(500).send('Error saving the user');
      } else {
        res.status(201).send('User successfully saved');
      }
    }
  );
});

app.listen(port, () => {
  console.log(
    'the argonauts is comming now available on http://localhost:5050 !'
  );
});
