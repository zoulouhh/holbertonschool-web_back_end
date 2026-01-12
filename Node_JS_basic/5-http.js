const http = require('http');
const fs = require('fs');

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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => {
        res.end(data);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err.message);
      });
  }
});

app.listen(1245);

module.exports = app;