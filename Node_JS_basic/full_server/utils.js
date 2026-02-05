import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    const lines = data
      .trim()
      .split('\n')
      .slice(1);

    const fields = {};

    lines.forEach((line) => {
      const parts = line.split(',');
      const firstName = parts[0];
      const field = parts[3];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    resolve(fields);
  });
});

export default readDatabase;
