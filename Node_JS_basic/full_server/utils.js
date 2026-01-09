import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    const lines = data.trim().split('\n');
    const students = {};

    for (const line of lines.slice(1)) {
      const [firstname, , , field] = line.split(',');
      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(firstname);
    }

    resolve(students);
  });
});

export default readDatabase;
