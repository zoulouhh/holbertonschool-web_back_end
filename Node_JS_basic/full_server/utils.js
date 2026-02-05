import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const fields = {};
      lines.slice(1).forEach((line) => {
        const [firstname, , field] = line.split(',');
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      });
      resolve(fields);
    });
  });
}

export default readDatabase;
