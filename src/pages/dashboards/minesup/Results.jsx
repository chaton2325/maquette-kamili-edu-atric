import { useMemo, useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  results,
  establishmentById,
  mentionOrder,
  mentionBadge,
} from '../../../data/national.js'
import { DonutChart, BarChart } from '../ministry/charts.jsx'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

const higherEdResults = results.filter((r) => establishmentById(r.establishmentId)?.ministry === 'MINESUP')

function Results() {
  const [estab, setEstab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return higherEdResults.filter((r) => {
      if (estab !== 'all' && r.establishmentId !== estab) return false
      if (query && !`${r.name} ${establishmentById(r.establishmentId)?.name}`.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [estab, query])

  const avg = filtered.length
    ? Math.round((filtered.reduce((s, r) => s + r.average, 0) / filtered.length) * 10) / 10
    : 0

  const mentionSegments = mentionOrder.map((label, i) => ({
    key: label,
    label,
    icon: ['🌟', '👍', '😊', '🙂', '⚠️'][i],
    value: filtered.filter((r) => r.mention === label).length,
    index: i,
  }))

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="m-sup-estab">Université</label>
          <select id="m-sup-estab" className="min-filters__select" value={estab} onChange={(e) => setEstab(e.target.value)}>
            <option value="all">Toutes les universités</option>
            {higherEdResults
              .map((r) => establishmentById(r.establishmentId))
              .filter((e, i, arr) => e && arr.findIndex((x) => x.id === e.id) === i)
              .map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
          </select>
        </div>
        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="m-sup-query">Recherche étudiant</label>
          <input
            id="m-sup-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom de l’étudiant…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Résultats</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">dossiers étudiants</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Moyenne</span>
          <span className="min-kpi__value">{avg.toLocaleString('fr-FR')}</span>
          <span className="min-kpi__meta">sur 20</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Mentions TB / B</span>
          <span className="min-kpi__value">
            {filtered.filter((r) => ['Très bien', 'Bien'].includes(r.mention)).length}
          </span>
          <span className="min-kpi__meta">mention supérieure</span>
        </div>
      </div>

      <div className="min-canvas">
        <section className="pb-card min-canvas__span-5">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition des mentions</span>
            <span className="pb-card__meta">échelle universitaire</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={mentionSegments} size={180} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-7">
          <div className="pb-card__header">
            <span className="pb-card__title">Podium des étudiants</span>
            <span className="pb-card__meta">meilleures moyennes</span>
          </div>
          <div className="pb-card__body">
            <BarChart
              data={[...filtered]
                .sort((a, b) => b.average - a.average)
                .slice(0, 8)
                .map((r) => ({ label: r.name.split(' ')[0], value: r.average }))}
              max={20}
            />
          </div>
        </section>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Résultats par étudiant</span>
          <span className="pb-card__meta">{filtered.length} dossiers</span>
        </div>
        <div className="pb-card__body pb-card__body--flush">
          <div className="min-table-wrap">
            <table className="min-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Étudiant</th>
                  <th>Université</th>
                  <th>Filière / niveau</th>
                  <th>Moyenne /20</th>
                  <th>Mention</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="reg-empty">Aucun résultat trouvé.</td></tr>
                )}
                {filtered.map((r) => {
                  const e = establishmentById(r.establishmentId)
                  return (
                    <tr key={r.id}>
                      <td className="min-table__rank">#{r.rank}</td>
                      <td className="min-table__name">{r.name}</td>
                      <td>{e?.name ?? '—'}</td>
                      <td>{r.level}</td>
                      <td className="min-table__avg">{r.average.toLocaleString('fr-FR')}</td>
                      <td><Badge variant={mentionBadge[r.mention]}>{r.mention}</Badge></td>
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

export default Results