const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = data.toString().split('\n');
    let students = lines.filter((line) => line.trim() !== '');

    // Remove header
    students = students.slice(1);

    const fields = {};

    for (const line of students) {
      const student = line.split(',');
      if (student.length >= 4) {
        const field = student[3];
        const firstname = student[0];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    }

    let output = `Number of students: ${students.length}`;
    for (const [field, firstnames] of Object.entries(fields)) {
      output += `\nNumber of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`;
    }
    resolve(output);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;