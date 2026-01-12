import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((fields) => {
        const parts = ['This is the list of our students'];
        const keys = Object.keys(fields).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        for (const key of keys) {
          parts.push(`Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
        }
        response.status(200).send(parts.join('\n'));
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(process.argv[2])
      .then((fields) => {
        const students = fields[major] || [];
        response.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;