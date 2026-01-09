const fs = require('fs');

function countStudents(path) {
  let data;

  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (e) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line);

  const students = lines.slice(1);
  console.log(`Number of students: ${students.length}`);

  const fields = {};

  students.forEach((line) => {
    const [firstname, , , field] = line.split(',');
    if (!fields[field]) fields[field] = [];
    fields[field].push(firstname);
  });

  Object.entries(fields).forEach(([field, list]) => {
    console.log(
      `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`
    );
  });
}

module.exports = countStudents;