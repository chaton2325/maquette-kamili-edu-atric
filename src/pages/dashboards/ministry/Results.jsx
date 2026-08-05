import { useMemo, useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  results,
  establishmentById,
  ministryLabels,
  mentionOrder,
  mentionBadge,
  kindIcons,
} from '../../../data/national.js'
import { ministryList } from '../../../data/ministry.js'
import { DonutChart, BarChart } from '../ministry/charts.jsx'
import './Registry.css'

function formatAvg(n) {
  return n.toLocaleString('fr-FR')
}

function Results() {
  const [ministry, setMinistry] = useState('all')
  const [estab, setEstab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const e = establishmentById(r.establishmentId)
      if (!e) return false
      if (ministry !== 'all' && e.ministry !== ministry) return false
      if (estab !== 'all' && r.establishmentId !== estab) return false
      if (query && !`${r.name} ${e.name}`.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [ministry, estab, query])

  const avg = filtered.length
    ? filtered.reduce((s, r) => s + r.average, 0) / filtered.length
    : 0
  const topCount = filtered.filter((r) => ['Très bien', 'Bien'].includes(r.mention)).length

  const mentionSegments = mentionOrder.map((label, i) => ({
    key: label,
    label,
    icon: ['🌟', '👍', '😊', '🙂', '⚠️'][i],
    value: filtered.filter((r) => r.mention === label).length,
    index: i,
  }))

  const byLevel = [...new Set(filtered.map((r) => r.level))]

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
                onClick={() => { setMinistry(m.id); setEstab('all') }}
              >
                <span aria-hidden="true">{m.icon}</span>
                <span>{m.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="res-estab">Établissement</label>
          <select id="res-estab" className="min-filters__select" value={estab} onChange={(e) => setEstab(e.target.value)}>
            <option value="all">Tous les établissements</option>
            {results
              .map((r) => establishmentById(r.establishmentId))
              .filter((e) => e && (ministry === 'all' || e.ministry === ministry))
              .filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i)
              .map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
          </select>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="res-query">Recherche élève</label>
          <input
            id="res-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom de l’élève…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Résultats affichés</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">dossiers élèves / étudiants</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Moyenne générale</span>
          <span className="min-kpi__value">{formatAvg(Math.round(avg * 10) / 10)}</span>
          <span className="min-kpi__meta">sur 20</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Mentions supérieures</span>
          <span className="min-kpi__value">{topCount}</span>
          <span className="min-kpi__delta min-kpi__delta--up">
            {filtered.length ? Math.round((topCount / filtered.length) * 100) : 0} %
          </span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Niveaux représentés</span>
          <span className="min-kpi__value">{byLevel.length}</span>
          <span className="min-kpi__meta">classes / filières</span>
        </div>
      </div>

      <div className="min-canvas">
        <section className="pb-card min-canvas__span-5">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition des mentions</span>
            <span className="pb-card__meta">échelle nationale</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={mentionSegments} size={180} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-7">
          <div className="pb-card__header">
            <span className="pb-card__title">Meilleurs élèves par moyenne</span>
            <span className="pb-card__meta">podium</span>
          </div>
          <div className="pb-card__body">
            <BarChart
              data={[...filtered]
                .sort((a, b) => b.average - a.average)
                .slice(0, 8)
                .map((r) => ({ label: r.name.split(' ')[0], value: r.average }))}
              max={20}
              formatValue={formatAvg}
            />
          </div>
        </section>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Résultats par élève</span>
          <span className="pb-card__meta">
            {ministry === 'all' ? 'tous ministères' : ministryLabels[ministry]} —
            {filtered.length} dossiers
          </span>
        </div>
        <div className="pb-card__body pb-card__body--flush">
          <div className="min-table-wrap">
            <table className="min-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Élève</th>
                  <th>Établissement</th>
                  <th>Niveau</th>
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
                      <td>
                        <span className="min-table__school">
                          <span aria-hidden="true">{e ? kindIcons[e.kind] : '🏫'}</span>
                          {e?.name ?? '—'}
                        </span>
                      </td>
                      <td>{r.level}</td>
                      <td className="min-table__avg">{formatAvg(r.average)}</td>
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