import { useState } from 'react'
import Dropdown from '../../../../components/Dropdown/Dropdown.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { children } from '../../../../data/children.js'
import { grades } from '../../../../data/grades.js'
import '../ParentPage.css'

function childName(childId) {
  const child = children.find((item) => item.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : '—'
}

function Grades() {
  const [childFilter, setChildFilter] = useState('all')

  const filteredGrades =
    childFilter === 'all'
      ? grades
      : grades.filter((grade) => grade.childId === childFilter)

  const filterItems = [
    { label: 'Tous les enfants', onClick: () => setChildFilter('all') },
    ...children.map((child) => ({
      label: `${child.firstName} ${child.lastName}`,
      onClick: () => setChildFilter(child.id),
    })),
  ]

  const filterLabel =
    childFilter === 'all' ? 'Tous les enfants' : childName(childFilter)

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Notes</h1>
          <p>Détail des notes par matière et par trimestre.</p>
        </div>
        <Dropdown label={filterLabel} items={filterItems} align="right" />
      </div>

      <section className="parent-page__section">
        <Table>
          <thead>
            <tr>
              <th>Enfant</th>
              <th>Matière</th>
              <th>Trimestre</th>
              <th>Coefficient</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrades.map((grade) => (
              <tr key={grade.id}>
                <td>{childName(grade.childId)}</td>
                <td>{grade.subject}</td>
                <td>{grade.term}</td>
                <td>{grade.coefficient}</td>
                <td>{grade.score}/20</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Grades
