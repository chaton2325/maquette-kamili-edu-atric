import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  establishments,
  kindLabels,
  kindIcons,
  ministryLabels,
  regionName,
  establishmentById,
  establishmentStatusLabels,
  teachersFor,
  resultsFor,
} from '../../../data/national.js'
import { regions, ministryList } from '../../../data/ministry.js'
import { DonutChart, BarChart } from '../ministry/charts.jsx'
import './Registry.css'

const statusVariant = { actif: 'success', surveillance: 'warning' }

const kindOrder = ['ecole', 'lycee', 'universite', 'grande-ecole', 'institut']

function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  if (n >= 1000) return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  return n.toLocaleString('fr-FR')
}

function Establishments() {
  const [ministry, setMinistry] = useState('all')
  const [region, setRegion] = useState('all')
  const [kind, setKind] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const filtered = establishments.filter((e) => {
    if (ministry !== 'all' && e.ministry !== ministry) return false
    if (region !== 'all' && e.regionId !== region) return false
    if (kind !== 'all' && e.kind !== kind) return false
    if (query && !`${e.name} ${e.acronym}`.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const selected = selectedId ? establishmentById(selectedId) : null
  const selectedTeachers = selected ? teachersFor(selected.id) : []
  const selectedResults = selected ? resultsFor(selected.id).slice(0, 5) : []

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
                onClick={() => { setMinistry(m.id); setSelectedId(null) }}
              >
                <span aria-hidden="true">{m.icon}</span>
                <span>{m.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="reg-region">Région</label>
          <select id="reg-region" className="min-filters__select" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">Toutes les régions</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="reg-kind">Type d’établissement</label>
          <select id="reg-kind" className="min-filters__select" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="all">Tous les types</option>
            {kindOrder.filter((k) => typeof kindLabels[k] !== 'undefined').map((k) => (
              <option key={k} value={k}>{kindLabels[k]}</option>
            ))}
          </select>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="reg-query">Recherche</label>
          <input
            id="reg-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom ou sigle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Établissements</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">résultats filtrés</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Universités / grandes écoles</span>
          <span className="min-kpi__value">
            {filtered.filter((e) => e.kind === 'universite' || e.kind === 'grande-ecole').length}
          </span>
          <span className="min-kpi__meta">MINESUP</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Effectifs cumulés</span>
          <span className="min-kpi__value">{formatCompact(filtered.reduce((s, e) => s + e.students, 0))}</span>
          <span className="min-kpi__meta">{filtered.length} établissements</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Sous surveillance</span>
          <span className="min-kpi__value">{filtered.filter((e) => e.status === 'surveillance').length}</span>
          <span className="min-kpi__delta min-kpi__delta--down">à suivre de près</span>
        </div>
      </div>

      <div className="reg-layout">
        <div className="reg-list">
          {filtered.length === 0 && (
            <div className="reg-empty">Aucun établissement ne correspond aux critères.</div>
          )}
          {filtered.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`reg-card${selectedId === e.id ? ' reg-card--active' : ''}`}
              onClick={() => setSelectedId(e.id)}
            >
              <span className="reg-card__icon" aria-hidden="true">{kindIcons[e.kind]}</span>
              <span className="reg-card__body">
                <span className="reg-card__name">{e.name}</span>
                <span className="reg-card__meta">
                  {kindLabels[e.kind]} · {regionName(e.regionId)} · {e.city}
                </span>
                <span className="reg-card__stats">
                  <span>🎓 {formatCompact(e.students)}</span>
                  <span>👩‍🏫 {e.teachers}</span>
                  <span>✅ {e.successRate} %</span>
                </span>
              </span>
              <Badge variant={statusVariant[e.status]}>{establishmentStatusLabels[e.status]}</Badge>
            </button>
          ))}
        </div>

        <aside className="reg-detail">
          {!selected ? (
            <div className="reg-detail__placeholder">
              <span aria-hidden="true">🏛️</span>
              <p>Sélectionnez un établissement pour voir le détail</p>
            </div>
          ) : (
            <>
              <div className="pb-card__header">
                <span className="pb-card__title">{selected.name}</span>
                <Badge variant={statusVariant[selected.status]}>{establishmentStatusLabels[selected.status]}</Badge>
              </div>
              <div className="reg-detail__body">
                <div className="reg-detail__grid">
                  <div className="reg-detail__cell"><span>Ministère</span><strong>{ministryLabels[selected.ministry]}</strong></div>
                  <div className="reg-detail__cell"><span>Type</span><strong>{kindLabels[selected.kind]}</strong></div>
                  <div className="reg-detail__cell"><span>Localisation</span><strong>{regionName(selected.regionId)} — {selected.city}</strong></div>
                  <div className="reg-detail__cell"><span>Fondé en</span><strong>{selected.founded}</strong></div>
                  <div className="reg-detail__cell"><span>Effectifs</span><strong>{formatCompact(selected.students)}</strong></div>
                  <div className="reg-detail__cell"><span>Enseignants</span><strong>{selected.teachers}</strong></div>
                  <div className="reg-detail__cell"><span>Ratio élèves/ens.</span><strong>{Math.round(selected.students / selected.teachers)}:1</strong></div>
                  <div className="reg-detail__cell"><span>Taux de réussite</span><strong>{selected.successRate} %</strong></div>
                </div>
                <p className="reg-detail__contact">📧 {selected.contact}</p>

                <div className="reg-detail__block">
                  <h4 className="reg-detail__subtitle">Enseignants ({selectedTeachers.length})</h4>
                  <ul className="reg-detail__list">
                    {selectedTeachers.map((t) => (
                      <li key={t.id} className="reg-detail__li">{t.name} — {t.discipline}</li>
                    ))}
                    {selectedTeachers.length === 0 && <li className="reg-detail__li">Enseignants non renseignés ici.</li>}
                  </ul>
                </div>

                <div className="reg-detail__block">
                  <h4 className="reg-detail__subtitle">Meilleurs résultats</h4>
                  {selectedResults.length === 0 ? (
                    <p className="reg-detail__li">Aucun résultat enregistré.</p>
                  ) : (
                    <ul className="reg-detail__list">
                      {selectedResults.map((r) => (
                        <li key={r.id} className="reg-detail__li">
                          <span>{r.name} — {r.level} — {r.average.toLocaleString('fr-FR')}/20</span>
                          <Badge variant={['Très bien', 'Bien'].includes(r.mention) ? 'success' : 'neutral'}>{r.mention}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      <div className="min-canvas">
        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Établissements par type</span>
            <span className="pb-card__meta">répartition</span>
          </div>
          <div className="pb-card__body">
            <DonutChart
              segments={kindOrder.map((k, i) => ({
                key: k,
                label: kindLabels[k],
                icon: kindIcons[k],
                value: establishments.filter((e) => e.kind === k).length,
                index: i,
              }))}
            />
          </div>
        </section>
        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Effectifs cumulés par ministère</span>
            <span className="pb-card__meta">tous types confondus</span>
          </div>
          <div className="pb-card__body">
            <BarChart
              data={ministryList.map((m) => ({
                label: m.id,
                value: establishments.filter((e) => e.ministry === m.id).reduce((s, e) => s + e.students, 0),
              }))}
              max={establishments.filter((e) => e.ministry === 'MINESUP').reduce((s, e) => s + e.students, 0)}
              formatValue={formatCompact}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Establishments