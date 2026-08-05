import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal/Modal.jsx'
import Input from '../../components/Input/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import Alert from '../../components/Alert/Alert.jsx'
import Badge from '../../components/Badge/Badge.jsx'
import { regions } from '../../data/ministry.js'
import {
  publicEstablishments,
  kindLabels,
  kindIcons,
  regionName,
} from '../../data/catalogue.js'
import './Establishments.css'

const kindOrder = ['ecole', 'lycee', 'universite', 'grande-ecole', 'institut']

const ministryFilters = [
  { id: 'all', label: 'Tous', icon: '🇨🇲' },
  { id: 'MINEDUB', label: 'Éducation de Base', icon: '🎒' },
  { id: 'MINESEC', label: 'Secondaire', icon: '🏫' },
  { id: 'MINESUP', label: 'Supérieur', icon: '🎓' },
]

function formatFCFA(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}

function formatCompact(n) {
  if (n >= 1000000) {
    return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  }
  return n.toLocaleString('fr-FR')
}

const emptyEnrollee = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  level: '',
  bacYear: '',
}

function Establishments() {
  const [ministry, setMinistry] = useState('all')
  const [region, setRegion] = useState('all')
  const [kind, setKind] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [enrollee, setEnrollee] = useState(emptyEnrollee)
  const [applied, setApplied] = useState(null)
  const [appliedError, setAppliedError] = useState(null)

  const filtered = publicEstablishments.filter((e) => {
    if (ministry !== 'all' && e.ministry !== ministry) return false
    if (region !== 'all' && e.regionId !== region) return false
    if (kind !== 'all' && e.kind !== kind) return false
    if (
      query &&
      !`${e.name} ${e.acronym}`.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const selected = selectedId
    ? publicEstablishments.find((e) => e.id === selectedId)
    : null

  function handleChange(field) {
    return (event) => {
      setEnrollee((prev) => ({ ...prev, [field]: event.target.value }))
      setAppliedError(null)
    }
  }

  function handleApply(event) {
    event.preventDefault()
    if (!enrollee.firstName.trim() || !enrollee.lastName.trim()) {
      setAppliedError('Le prénom et le nom sont obligatoires.')
      return
    }
    if (!enrollee.email.trim()) {
      setAppliedError('Une adresse e-mail est obligatoire.')
      return
    }
    setApplied({
      ...enrollee,
      establishmentId: selected.id,
      establishmentName: selected.name,
    })
    setEnrollee({ ...emptyEnrollee, level: selected.levels[0] ?? '' })
  }

  function openEnroll(establishment) {
    setSelectedId(establishment.id)
    setEnrollee({ ...emptyEnrollee, level: establishment.levels[0] ?? '' })
    setApplied(null)
    setAppliedError(null)
  }

  function closeModal() {
    setSelectedId(null)
    setEnrollee(emptyEnrollee)
    setApplied(null)
    setAppliedError(null)
  }

  return (
    <section className="catalogue">
      <header className="catalogue__header">
        <span className="catalogue__badge">Catalogue public</span>
        <h1 className="catalogue__title">
          Parcourir les <span className="catalogue__accent">établissements</span>
        </h1>
        <p className="catalogue__subtitle">
          Parents : consultez les écoles, collèges et lycées, leurs
          descriptions et frais, puis inscrivez votre enfant. Universités et
          grandes écoles : tout le monde peut parcourir et postuler.
        </p>
      </header>

      <div className="catalogue__filters">
        <div className="catalogue__tabs" role="group" aria-label="Filtrer par ministère">
          {ministryFilters.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`catalogue__tab${ministry === m.id ? ' catalogue__tab--active' : ''}`}
              onClick={() => setMinistry(m.id)}
            >
              <span aria-hidden="true">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <div className="catalogue__selects">
          <label className="catalogue__field">
            <span className="catalogue__label" htmlFor="cat-region">
              Région
            </span>
            <select
              id="cat-region"
              className="catalogue__select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>

          <label className="catalogue__field">
            <span className="catalogue__label" htmlFor="cat-kind">
              Type d’établissement
            </span>
            <select
              id="cat-kind"
              className="catalogue__select"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              <option value="all">Tous les types</option>
              {kindOrder.map((k) => (
                <option key={k} value={k}>
                  {kindLabels[k]}
                </option>
              ))}
            </select>
          </label>

          <label className="catalogue__field catalogue__field--grow">
            <span className="catalogue__label" htmlFor="cat-query">
              Recherche
            </span>
            <input
              id="cat-query"
              type="search"
              className="catalogue__select"
              placeholder="Nom ou sigle…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="catalogue__count">
        {filtered.length} établissement{filtered.length > 1 ? 's' : ''} trouvé
        {filtered.length > 1 ? 's' : ''}
      </div>

      {filtered.length === 0 && (
        <div className="catalogue__empty">
          Aucun établissement ne correspond à vos critères.
        </div>
      )}

      <div className="catalogue__grid">
        {filtered.map((e, index) => (
          <article
            key={e.id}
            className="cat-card anim-fade-up"
            style={{ '--delay': `${Math.min(index, 8) * 50}ms` }}
          >
            <div className="cat-card__head">
              <span className="cat-card__icon" aria-hidden="true">
                {kindIcons[e.kind]}
              </span>
              <div className="cat-card__identity">
                <h3 className="cat-card__name">
                  {e.name}{' '}
                  {e.acronym && (
                    <span className="cat-card__acronym">{e.acronym}</span>
                  )}
                </h3>
                <p className="cat-card__meta">
                  {kindLabels[e.kind]} · {regionName(e.regionId)} — {e.city}
                </p>
              </div>
              <Badge variant={e.openForAll ? 'info' : 'neutral'}>
                {e.openForAll ? 'Inscription ouverte' : 'Inscription parent'}
              </Badge>
            </div>

            <p className="cat-card__description">
              {e.description || 'Description disponible sur demande auprès de l’établissement.'}
            </p>

            <div className="cat-card__stats">
              <div className="cat-card__stat">
                <span className="cat-card__stat-value">
                  {formatCompact(e.students)}
                </span>
                <span className="cat-card__stat-label">Élèves</span>
              </div>
              <div className="cat-card__stat">
                <span className="cat-card__stat-value">{e.successRate} %</span>
                <span className="cat-card__stat-label">Réussite</span>
              </div>
              <div className="cat-card__stat">
                <span className="cat-card__stat-value">
                  {e.tuition ? formatFCFA(e.tuition) : '—'}
                </span>
                <span className="cat-card__stat-label">Frais / an</span>
              </div>
            </div>

            {e.levels.length > 0 && (
              <div className="cat-card__levels">
                {e.levels.slice(0, 5).map((level) => (
                  <span key={level} className="cat-card__level">
                    {level}
                  </span>
                ))}
                {e.levels.length > 5 && (
                  <span className="cat-card__level cat-card__level--more">
                    +{e.levels.length - 5}
                  </span>
                )}
              </div>
            )}

            <div className="cat-card__actions">
              {e.openForAll ? (
                <Button size="sm" onClick={() => openEnroll(e)}>
                  S’inscrire
                </Button>
              ) : (
                <Link
                  to={`/dashboard/parent/register?school=${encodeURIComponent(e.name)}`}
                  className="btn btn--primary btn--sm"
                >
                  Inscrire un enfant
                </Link>
              )}
              <span className="cat-card__contact">📧 {e.contact}</span>
            </div>
          </article>
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={closeModal}
        title={selected ? `Inscription — ${selected.name}` : 'Inscription'}
      >
        {selected && (
          <form className="cat-enroll" onSubmit={handleApply} noValidate>
            <p className="cat-enroll__intro">
              L’inscription est ouverte à tous. Renseignez vos informations pour
              candidater (simulation de démonstration).
            </p>

            {applied && (
              <Alert
                variant="success"
                title="Candidature envoyée 🎉"
                onClose={() => setApplied(null)}
              >
                Merci {applied.firstName} {applied.lastName}. Votre candidature
                pour {applied.establishmentName} a bien été enregistrée. Le
                dossier complet vous sera demandé par e-mail.
              </Alert>
            )}

            {appliedError && (
              <Alert
                variant="danger"
                title="Formulaire incomplet"
                onClose={() => setAppliedError(null)}
              >
                {appliedError}
              </Alert>
            )}

            <Input
              id="cat-firstname"
              label="Prénom *"
              value={enrollee.firstName}
              onChange={handleChange('firstName')}
              placeholder="Ex. Amina"
            />
            <Input
              id="cat-lastname"
              label="Nom *"
              value={enrollee.lastName}
              onChange={handleChange('lastName')}
              placeholder="Ex. Koné"
            />
            <Input
              id="cat-email"
              type="email"
              label="E-mail *"
              value={enrollee.email}
              onChange={handleChange('email')}
              placeholder="vous@exemple.cm"
            />
            <Input
              id="cat-phone"
              type="tel"
              label="Téléphone"
              value={enrollee.phone}
              onChange={handleChange('phone')}
              placeholder="+237 6 99 00 11 22"
            />

            {selected.levels.length > 0 && (
              <label className="field">
                <span className="field__label" htmlFor="cat-level">
                  Niveau visé
                </span>
                <select
                  id="cat-level"
                  className="select"
                  value={enrollee.level}
                  onChange={handleChange('level')}
                >
                  {selected.levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <Input
              id="cat-bacyear"
              label="Année du bac"
              value={enrollee.bacYear}
              onChange={handleChange('bacYear')}
              placeholder="Ex. 2026"
            />

            <div className="cat-enroll__actions">
              <Button type="submit" fullWidth size="lg">
                Envoyer ma candidature
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  )
}

export default Establishments
