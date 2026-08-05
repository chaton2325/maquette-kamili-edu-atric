import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  teachers,
  teacherGradeLabels,
  establishmentById,
  regionName,
  ministryLabels,
  kindIcons,
} from '../../../data/national.js'
import { regions, ministryList } from '../../../data/ministry.js'
import './Registry.css'

const statusLabels = { present: 'Présent', absent: 'Absent', retard: 'En retard' }
const statusVariant = { present: 'success', absent: 'danger', retard: 'warning' }
const typeLabels = { permanent: 'Permanent', contractuel: 'Contractuel' }
const typeVariant = { permanent: 'primary', contractuel: 'neutral' }

function Teachers() {
  const [ministry, setMinistry] = useState('all')
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = teachers.filter((t) => {
    const e = establishmentById(t.establishmentId)
    if (!e) return false
    if (ministry !== 'all' && e.ministry !== ministry) return false
    if (region !== 'all' && e.regionId !== region) return false
    if (query && !`${t.name} ${t.discipline} ${e.name}`.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const totalLoad = filtered.reduce((s, t) => s + t.load, 0)
  const students = filtered.reduce((s, t) => s + (establishmentById(t.establishmentId)?.students ?? 0), 0)
  const present = filtered.filter((t) => t.status === 'present').length

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <span className="min-filters__label">Vue ministère</span>
          <div className="min-view-tabs" role="group" aria-label="Vue ministère">
            <button
              type="button"
              className={`min-view-tabs__button${ministry === 'all' ? ' min-view-tabs__button--active' : ''}`}
              onClick={() => setMinistry('all')}
            >
              🇨🇲 Tous
            </button>
            {ministryList.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`min-view-tabs__button${ministry === m.id ? ' min-view-tabs__button--active' : ''}`}
                onClick={() => setMinistry(m.id)}
              >
                <span aria-hidden="true">{m.icon}</span>
                <span>{m.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="tea-region">Région</label>
          <select id="tea-region" className="min-filters__select" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">Toutes les régions</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="tea-query">Recherche</label>
          <input
            id="tea-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom, matière, établissement…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Enseignants</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">liste filtrée</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Présents aujourd’hui</span>
          <span className="min-kpi__value">{present}</span>
          <span className="min-kpi__delta min-kpi__delta--up">
            {filtered.length ? Math.round((present / filtered.length) * 100) : 0} %
          </span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Effectifs encadrés</span>
          <span className="min-kpi__value">{students.toLocaleString('fr-FR')}</span>
          <span className="min-kpi__meta">élèves / étudiants cumulés</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Ratio moyen</span>
          <span className="min-kpi__value">{filtered.length ? Math.round(students / totalLoad) : 0}:1</span>
          <span className="min-kpi__meta">élèves par enseignant</span>
        </div>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Registre national des enseignants</span>
          <span className="pb-card__meta">{ministry === 'all' ? 'tous ministères' : ministryLabels[ministry]}</span>
        </div>
        <div className="pb-card__body pb-card__body--flush">
          <div className="min-table-wrap">
            <table className="min-table">
              <thead>
                <tr>
                  <th>Enseignant</th>
                  <th>Établissement</th>
                  <th>Discipline / Matière</th>
                  <th>Grade</th>
                  <th>Contrat</th>
                  <th>Statut</th>
                  <th>Charge</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="reg-empty">Aucun enseignant ne correspond aux critères.</td></tr>
                )}
                {filtered.map((t) => {
                  const e = establishmentById(t.establishmentId)
                  return (
                    <tr key={t.id}>
                      <td className="min-table__name">{t.name}</td>
                      <td>
                        <span className="min-table__school">
                          <span aria-hidden="true">{e ? kindIcons[e.kind] : '🏫'}</span>
                          {e?.name ?? '—'}
                          <span className="min-table__muted">{e ? `${regionName(e.regionId)} · ${e.city}` : ''}</span>
                        </span>
                      </td>
                      <td>{t.discipline}</td>
                      <td>{teacherGradeLabels[t.grade] ?? t.grade}</td>
                      <td><Badge variant={typeVariant[t.type]}>{typeLabels[t.type]}</Badge></td>
                      <td><Badge variant={statusVariant[t.status]}>{statusLabels[t.status]}</Badge></td>
                      <td>{t.load}</td>
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