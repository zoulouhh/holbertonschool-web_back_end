const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const database = process.argv[2];

  res.type('text');
  res.write('This is the list of our students\n');

  countStudents(database)
    .then(() => res.end())
    .catch(() => res.end('Cannot load the database'));
});

app.listen(1245);

module.exports = app;