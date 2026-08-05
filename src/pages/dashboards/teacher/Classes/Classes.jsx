import { Link } from 'react-router-dom'
import Card from '../../../../components/Card/Card.jsx'
import { teacherProfile } from '../../../../data/teacherProfile.js'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { teacherStudents } from '../../../../data/teacherStudents.js'
import '../TeacherPage.css'
import './Classes.css'

function Classes() {
  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Bonjour, {teacherProfile.firstName} 👋</h1>
          <p>
            {teacherProfile.subject} · {teacherProfile.school}
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Classes en charge</span>
          <span className="stat-tile__value">{teacherClasses.length}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Élèves au total</span>
          <span className="stat-tile__value">{teacherStudents.length}</span>
        </div>
      </div>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">Mes classes</h2>
        <div className="classes-grid">
          {teacherClasses.map((klass) => {
            const count = teacherStudents.filter(
              (student) => student.classId === klass.id,
            ).length
            return (
              <Card key={klass.id}>
                <Card.Header>{klass.name}</Card.Header>
                <Card.Body>
                  <p className="classes-card__meta">
                    {klass.subject} · {klass.room}
                  </p>
                  <p className="classes-card__count">{count} élèves</p>
                </Card.Body>
                <Card.Footer>
                  <Link
                    to="/dashboard/teacher/attendance"
                    className="btn btn--ghost btn--sm"
                  >
                    Présences
                  </Link>
                  <Link
                    to="/dashboard/teacher/grades"
                    className="btn btn--secondary btn--sm"
                  >
                    Notes
                  </Link>
                </Card.Footer>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Classes
