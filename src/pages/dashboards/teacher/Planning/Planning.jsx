import { teacherClasses } from '../../../../data/teacherClasses.js'
import { teacherPlanning, planningDays } from '../../../../data/teacherPlanning.js'
import '../TeacherPage.css'
import './Planning.css'

function getClass(classId) {
  return teacherClasses.find((klass) => klass.id === classId)
}

function Planning() {
  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Planning</h1>
          <p>Organisation hebdomadaire de vos cours.</p>
        </div>
      </div>

      <div className="planning-grid">
        {planningDays.map((day) => {
          const sessions = teacherPlanning
            .filter((session) => session.day === day)
            .sort((a, b) => a.start.localeCompare(b.start))

          return (
            <div key={day} className="planning-day">
              <h2 className="planning-day__title">{day}</h2>
              {sessions.length > 0 ? (
                <div className="planning-day__sessions">
                  {sessions.map((session) => {
                    const klass = getClass(session.classId)
                    return (
                      <div key={session.id} className="planning-session">
                        <span className="planning-session__time">
                          {session.start} – {session.end}
                        </span>
                        <span className="planning-session__class">
                          {klass?.name}
                        </span>
                        <span className="planning-session__meta">
                          {klass?.room}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="planning-day__empty">Aucun cours</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Planning
