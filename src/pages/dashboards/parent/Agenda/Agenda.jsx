import Tag from '../../../../components/Tag/Tag.jsx'
import { children } from '../../../../data/children.js'
import { agendaEvents, agendaTypeLabels } from '../../../../data/agenda.js'
import '../ParentPage.css'
import './Agenda.css'

const typeVariant = {
  reunion: 'primary',
  examen: 'accent',
  sortie: 'neutral',
  ferie: 'neutral',
}

function childName(childId) {
  if (!childId) return null
  const child = children.find((item) => item.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : null
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

function Agenda() {
  const sortedEvents = [...agendaEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  )

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Agenda</h1>
          <p>Réunions, examens et événements scolaires à venir.</p>
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
                  {agendaTypeLabels[event.type]}
                </Tag>
                {childName(event.childId) && (
                  <span className="agenda-item__child">
                    {childName(event.childId)}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Agenda
