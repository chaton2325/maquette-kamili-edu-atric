import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { children } from '../../../../data/children.js'
import {
  attendanceRecords,
  attendanceStatusLabels,
} from '../../../../data/attendance.js'
import '../ParentPage.css'

const attendanceVariant = {
  present: 'success',
  retard: 'warning',
  absent: 'danger',
}

function childName(childId) {
  const child = children.find((item) => item.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : '—'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
}

function Attendance() {
  const sortedRecords = [...attendanceRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  )

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Présences</h1>
          <p>Suivi journalier des présences, absences et retards.</p>
        </div>
      </div>

      <div className="stat-grid">
        {children.map((child) => (
          <div key={child.id} className="stat-tile">
            <span className="stat-tile__label">
              {child.avatar} {child.firstName}
            </span>
            <span className="stat-tile__value">{child.attendanceRate}%</span>
            <span className="stat-tile__meta">taux de présence</span>
          </div>
        ))}
      </div>

      <section className="parent-page__section">
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Enfant</th>
              <th>Statut</th>
              <th>Motif</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record) => (
              <tr key={record.id}>
                <td>{formatDate(record.date)}</td>
                <td>{childName(record.childId)}</td>
                <td>
                  <Badge variant={attendanceVariant[record.status]}>
                    {attendanceStatusLabels[record.status]}
                  </Badge>
                </td>
                <td>{record.reason ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Attendance
