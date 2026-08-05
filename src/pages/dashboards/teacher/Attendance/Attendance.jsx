import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Dropdown from '../../../../components/Dropdown/Dropdown.jsx'
import Alert from '../../../../components/Alert/Alert.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { teacherStudents } from '../../../../data/teacherStudents.js'
import { attendanceSessions } from '../../../../data/teacherAttendance.js'
import '../TeacherPage.css'
import './Attendance.css'

const statusVariant = { present: 'success', retard: 'warning', absent: 'danger' }
const statusLabel = { present: 'Présent', retard: 'Retard', absent: 'Absent' }
const nextStatus = { present: 'retard', retard: 'absent', absent: 'present' }

function getClassName(classId) {
  return teacherClasses.find((klass) => klass.id === classId)?.name ?? '—'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}

function Attendance() {
  const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id)
  const [draft, setDraft] = useState(() =>
    Object.fromEntries(
      teacherStudents.map((student) => [student.id, 'present']),
    ),
  )
  const [saved, setSaved] = useState(false)

  const classStudents = teacherStudents.filter(
    (student) => student.classId === selectedClassId,
  )

  function cycleStatus(studentId) {
    setDraft((prev) => ({ ...prev, [studentId]: nextStatus[prev[studentId]] }))
    setSaved(false)
  }

  const classItems = teacherClasses.map((klass) => ({
    label: klass.name,
    onClick: () => {
      setSelectedClassId(klass.id)
      setSaved(false)
    },
  }))

  const sortedSessions = [...attendanceSessions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  )

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Présences</h1>
          <p>Prise de présence et historique par classe.</p>
        </div>
        <Dropdown
          label={getClassName(selectedClassId)}
          items={classItems}
          align="right"
        />
      </div>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">
          Feuille de présence — {getClassName(selectedClassId)}
        </h2>

        {saved && (
          <Alert
            variant="success"
            title="Présence enregistrée"
            onClose={() => setSaved(false)}
          >
            La feuille de présence a été enregistrée (simulation).
          </Alert>
        )}

        <ul className="roster-list">
          {classStudents.map((student) => (
            <li key={student.id} className="roster-item">
              <span className="roster-item__name">
                {student.firstName} {student.lastName}
              </span>
              <button
                type="button"
                className="roster-item__status"
                onClick={() => cycleStatus(student.id)}
              >
                <Badge variant={statusVariant[draft[student.id]]}>
                  {statusLabel[draft[student.id]]}
                </Badge>
              </button>
            </li>
          ))}
        </ul>

        <Button onClick={() => setSaved(true)}>
          Enregistrer la présence
        </Button>
      </section>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">Historique des séances</h2>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Classe</th>
              <th>Présents</th>
              <th>Absents</th>
              <th>Retards</th>
              <th>Taux de présence</th>
            </tr>
          </thead>
          <tbody>
            {sortedSessions.map((session) => {
              const total = session.present + session.absent + session.retard
              const rate = Math.round((session.present / total) * 100)
              return (
                <tr key={session.id}>
                  <td>{formatDate(session.date)}</td>
                  <td>{getClassName(session.classId)}</td>
                  <td>{session.present}</td>
                  <td>{session.absent}</td>
                  <td>{session.retard}</td>
                  <td>{rate}%</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Attendance
