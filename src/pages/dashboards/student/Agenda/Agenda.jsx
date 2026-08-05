import Tag from '../../../../components/Tag/Tag.jsx'
import {
  studentAgendaEvents,
  studentAgendaTypeLabels,
} from '../../../../data/studentAgenda.js'
import '../StudentPage.css'
import './Agenda.css'

const typeVariant = {
  examen: 'accent',
  devoir: 'primary',
  bibliotheque: 'neutral',
  reunion: 'primary',
  ferie: 'neutral',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

function Agenda() {
  const sortedEvents = [...studentAgendaEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  )

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Agenda</h1>
          <p>Examens, devoirs et événements scolaires à venir.</p>
        </div>
      </div>

      <ol className="agenda-timeline">
        {sortedEvents.map((event) => (
          <li key={event.id} className="agenda-item">
            <div className="agenda-item__marker" aria-hidden="true" />
            <div className="agenda-item__content">
              <span className="agenda-item__date">{formatDate(event.date)}</span>
              <h3 className="agenda-item__title">{event.title}</h3>
              <div className="agenda-item__meta">
                <Tag variant={typeVariant[event.type]}>
                  {studentAgendaTypeLabels[event.type]}
                </Tag>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Agenda
