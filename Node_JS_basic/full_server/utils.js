import fs from 'fs';

export const readDatabase = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return reject(err);

    const lines = data
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const students = lines.slice(1);
    const fields = {};

    students.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });

    return resolve(fields);
  });
});