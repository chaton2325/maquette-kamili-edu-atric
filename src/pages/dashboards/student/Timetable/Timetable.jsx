import { timetable, timetableDays } from '../../../../data/timetable.js'
import '../StudentPage.css'
import './Timetable.css'

function Timetable() {
  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Emploi du temps</h1>
          <p>Organisation hebdomadaire des cours.</p>
        </div>
      </div>

      <div className="timetable-grid">
        {timetableDays.map((day) => {
          const sessions = timetable
            .filter((session) => session.day === day)
            .sort((a, b) => a.start.localeCompare(b.start))

          return (
            <div key={day} className="timetable-day">
              <h2 className="timetable-day__title">{day}</h2>
              {sessions.length > 0 ? (
                <div className="timetable-day__sessions">
                  {sessions.map((session) => (
                    <div key={session.id} className="timetable-session">
                      <span className="timetable-session__time">
                        {session.start} – {session.end}
                      </span>
                      <span className="timetable-session__subject">
                        {session.subject}
                      </span>
                      <span className="timetable-session__meta">
                        {session.room} · {session.teacher}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="timetable-day__empty">Aucun cours</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timetable
