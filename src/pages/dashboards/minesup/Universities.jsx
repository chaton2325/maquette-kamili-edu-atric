import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  establishments,
  kindLabels,
  kindIcons,
  regionName,
  establishmentStatusLabels,
  facultiesFor,
  teachersFor,
  resultsFor,
} from '../../../data/national.js'
import { regions } from '../../../data/ministry.js'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

const statusVariant = { actif: 'success', surveillance: 'warning' }

function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  if (n >= 1000) return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  return n.toLocaleString('fr-FR')
}

const higherEd = establishments.filter((e) => e.ministry === 'MINESUP')

function Universities() {
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('e-15')

  const filtered = higherEd.filter((e) => {
    if (region !== 'all' && e.regionId !== region) return false
    if (query && !`${e.name} ${e.acronym}`.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const selected = establishments.find((e) => e.id === selectedId) ?? filtered[0]
  const selectedFaculties = selected ? facultiesFor(selected.id) : []
  const selectedTeachers = selected ? teachersFor(selected.id) : []
  const selectedResults = selected ? resultsFor(selected.id) : []

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="uni-region">Région</label>
          <select id="uni-region" className="min-filters__select" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">Toutes les régions</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="uni-query">Recherche</label>
          <input
            id="uni-query"
            type="search"
            className="min-filters__select min-filters__search"
            placeholder="Nom ou sigle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="uni-layout">
        <div className="uni-list">
          {filtered.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`uni-row${selected?.id === e.id ? ' uni-row--active' : ''}`}
              onClick={() => setSelectedId(e.id)}
            >
              <span className="uni-row__icon" aria-hidden="true">{kindIcons[e.kind]}</span>
              <span className="uni-row__body">
                <span className="uni-row__name">{e.name} <span className="uni-row__acronym">{e.acronym}</span></span>
                <span className="uni-row__meta">{kindLabels[e.kind]} · {regionName(e.regionId)} — {e.city}</span>
                <span className="uni-row__stats">
                  <span>🎓 {formatCompact(e.students)}</span>
                  <span>👩‍🏫 {e.teachers}</span>
                  <span>✅ {e.successRate} %</span>
                </span>
              </span>
              <Badge variant={statusVariant[e.status]}>{establishmentStatusLabels[e.status]}</Badge>
            </button>
          ))}
        </div>

        {selected && (
          <aside className="uni-detail">
            <div className="pb-card__header">
              <span className="pb-card__title">{selected.name}</span>
              <Badge variant={statusVariant[selected.status]}>{establishmentStatusLabels[selected.status]}</Badge>
            </div>
            <div className="uni-detail__body">
              <div className="uni-detail__stats">
                <div className="uni-detail__stat"><span>Étudiants</span><strong>{formatCompact(selected.students)}</strong></div>
                <div className="uni-detail__stat"><span>Enseignants</span><strong>{selected.teachers}</strong></div>
                <div className="uni-detail__stat"><span>Ratio</span><strong>{Math.round(selected.students / selected.teachers)}:1</strong></div>
                <div className="uni-detail__stat"><span>Réussite</span><strong>{selected.successRate} %</strong></div>
              </div>
              <p className="uni-detail__meta">
                {kindLabels[selected.kind]} · Fondé en {selected.founded} · {regionName(selected.regionId)} — {selected.city}
              </p>

              <div className="uni-detail__block">
                <h4 className="uni-detail__subtitle">Facultés / filières ({selectedFaculties.length})</h4>
                <ul className="uni-detail__faculties">
                  {selectedFaculties.map((f) => (
                    <li key={f.id} className="uni-detail__faculty">
                      <span>{f.name}</span>
                      <span className="uni-detail__faculty-count">{f.students.toLocaleString('fr-FR')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="uni-detail__block">
                <h4 className="uni-detail__subtitle">Enseignants ({selectedTeachers.length})</h4>
                <ul className="uni-detail__list">
                  {selectedTeachers.map((t) => (
                    <li key={t.id} className="uni-detail__li">{t.name} — {t.discipline}</li>
                  ))}
                  {selectedTeachers.length === 0 && <li className="uni-detail__li">Non renseignés ici.</li>}
                </ul>
              </div>

              <div className="uni-detail__block">
                <h4 className="uni-detail__subtitle">Résultats (échantillon)</h4>
                <ul className="uni-detail__list">
                  {selectedResults.map((r) => (
                    <li key={r.id} className="uni-detail__li">
                      <span>{r.name} — {r.level} — {r.average.toLocaleString('fr-FR')}/20</span>
                      <Badge variant={['Très bien', 'Bien'].includes(r.mention) ? 'success' : 'neutral'}>{r.mention}</Badge>
                    </li>
                  ))}
                  {selectedResults.length === 0 && <li className="uni-detail__li">Aucun résultat enregistré.</li>}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default Universities