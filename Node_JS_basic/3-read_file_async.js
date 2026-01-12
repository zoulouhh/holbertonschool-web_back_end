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

    console.log(`Number of students: ${students.length}`);

    for (const [field, firstnames] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`);
    }
    resolve();
  });
});

module.exports = countStudents;