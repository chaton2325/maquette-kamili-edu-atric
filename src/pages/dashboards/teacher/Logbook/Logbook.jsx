import { useState } from 'react'
import Dropdown from '../../../../components/Dropdown/Dropdown.jsx'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { logbookEntries } from '../../../../data/logbook.js'
import '../TeacherPage.css'
import './Logbook.css'

function getClassName(classId) {
  return teacherClasses.find((klass) => klass.id === classId)?.name ?? '—'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

function Logbook() {
  const [classFilter, setClassFilter] = useState('all')

  const filteredEntries = (
    classFilter === 'all'
      ? logbookEntries
      : logbookEntries.filter((entry) => entry.classId === classFilter)
  )
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const filterItems = [
    { label: 'Toutes les classes', onClick: () => setClassFilter('all') },
    ...teacherClasses.map((klass) => ({
      label: klass.name,
      onClick: () => setClassFilter(klass.id),
    })),
  ]

  const filterLabel =
    classFilter === 'all' ? 'Toutes les classes' : getClassName(classFilter)

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Cahier de texte</h1>
          <p>Contenu enseigné, séance par séance.</p>
        </div>
        <Dropdown label={filterLabel} items={filterItems} align="right" />
      </div>

      <ul className="logbook-list">
        {filteredEntries.map((entry) => (
          <li key={entry.id} className="logbook-entry">
            <div className="logbook-entry__header">
              <span className="logbook-entry__class">
                {getClassName(entry.classId)}
              </span>
              <span className="logbook-entry__date">
                {formatDate(entry.date)}
              </span>
            </div>
            <h3 className="logbook-entry__title">{entry.title}</h3>
            <p className="logbook-entry__content">{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Logbook
