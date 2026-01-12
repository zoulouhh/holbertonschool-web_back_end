const fs = require('fs');

const countStudents = (path) => {
  let content;
  try {
    content = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = content.toString().split('\n');
  const students = lines.filter((line) => line.trim() !== '');

  // Remove header
  students.shift();

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
};

module.exports = countStudents;