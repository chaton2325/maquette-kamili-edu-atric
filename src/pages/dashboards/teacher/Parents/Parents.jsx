import { Link } from 'react-router-dom'
import Table from '../../../../components/Table/Table.jsx'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { teacherStudents } from '../../../../data/teacherStudents.js'
import { parentContacts } from '../../../../data/parentContacts.js'
import '../TeacherPage.css'

function studentInfo(studentId) {
  const student = teacherStudents.find((item) => item.id === studentId)
  if (!student) return { name: '—', className: '—' }
  const klass = teacherClasses.find((item) => item.id === student.classId)
  return {
    name: `${student.firstName} ${student.lastName}`,
    className: klass?.name ?? '—',
  }
}

function Parents() {
  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Parents</h1>
          <p>Contacts des parents de vos élèves.</p>
        </div>
      </div>

      <section className="teacher-page__section">
        <Table>
          <thead>
            <tr>
              <th>Parent</th>
              <th>Lien</th>
              <th>Élève</th>
              <th>Classe</th>
              <th>Téléphone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parentContacts.map((contact) => {
              const info = studentInfo(contact.studentId)
              return (
                <tr key={contact.id}>
                  <td>{contact.parentName}</td>
                  <td>{contact.relation}</td>
                  <td>{info.name}</td>
                  <td>{info.className}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <Link
                      to="/dashboard/teacher/messages"
                      className="btn btn--secondary btn--sm"
                    >
                      Contacter
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Parents
