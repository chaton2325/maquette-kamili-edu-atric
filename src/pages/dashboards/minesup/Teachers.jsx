import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  teachers,
  teacherGradeLabels,
  establishmentById,
} from '../../../data/national.js'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

const statusLabels = { present: 'Présent', absent: 'Absent', retard: 'En retard' }
const statusVariant = { present: 'success', absent: 'danger', retard: 'warning' }
const typeLabels = { permanent: 'Permanent', contractuel: 'Contractuel' }
const typeVariant = { permanent: 'primary', contractuel: 'neutral' }

const higherEdTeachers = teachers.filter((t) => {
  const e = establishmentById(t.establishmentId)
  return e?.ministry === 'MINESUP'
})

function Teachers() {
  const [query, setQuery] = useState('')

  const filtered = higherEdTeachers.filter(
    (t) => !query || `${t.name} ${t.discipline} ${establishmentById(t.establishmentId)?.name}`.toLowerCase().includes(query.toLowerCase()),
  )

  const present = filtered.filter((t) => t.status === 'present').length

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="m-sup-query">Recherche</label>
          <input
            id="m-sup-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom, discipline, université…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="pb-card__meta" style={{ alignSelf: 'center' }}>
          Enseignants-chercheurs et enseignants du supérieur — {filtered.length} affichés.
        </p>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Enseignants</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">échantillon démonstratif</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Présents</span>
          <span className="min-kpi__value">{present}</span>
          <span className="min-kpi__delta min-kpi__delta--up">
            {filtered.length ? Math.round((present / filtered.length) * 100) : 0} %
          </span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Professeurs titulaires</span>
          <span className="min-kpi__value">
            {filtered.filter((t) => t.grade === 'professeur').length}
          </span>
          <span className="min-kpi__meta">grade académique max.</span>
        </div>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Enseignants-chercheurs du supérieur</span>
          <span className="pb-card__meta">MINESUP</span>
        </div>
        <div className="pb-card__body pb-card__body--flush">
          <div className="min-table-wrap">
            <table className="min-table">
              <thead>
                <tr>
                  <th>Enseignant</th>
                  <th>Université</th>
                  <th>Discipline</th>
                  <th>Grade</th>
                  <th>Contrat</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="reg-empty">Aucun enseignant trouvé.</td></tr>
                )}
                {filtered.map((t) => {
                  const e = establishmentById(t.establishmentId)
                  return (
                    <tr key={t.id}>
                      <td className="min-table__name">{t.name}</td>
                      <td>{e?.name ?? '—'}</td>
                      <td>{t.discipline}</td>
                      <td>{teacherGradeLabels[t.grade] ?? t.grade}</td>
                      <td><Badge variant={typeVariant[t.type]}>{typeLabels[t.type]}</Badge></td>
                      <td><Badge variant={statusVariant[t.status]}>{statusLabels[t.status]}</Badge></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Teachers