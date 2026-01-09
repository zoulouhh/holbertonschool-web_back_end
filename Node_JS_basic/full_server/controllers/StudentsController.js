import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const database = process.argv[2];

    readDatabase(database)
      .then((fields) => {
        const keys = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        const lines = ['This is the list of our students'];
        keys.forEach((field) => {
          const list = fields[field];
          lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
        });

        res.status(200).send(lines.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const database = process.argv[2];
    const major = req.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((fields) => {
        const list = fields[major] || [];
        res.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;