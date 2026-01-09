import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        let output = 'This is the list of our students';

        const fields = Object.keys(students).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase()),
        );

        for (const field of fields) {
          const list = students[field];
          output += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
        }

        res.status(200).send(output);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const database = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((students) => {
        res.status(200).send(`List: ${students[major].join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
