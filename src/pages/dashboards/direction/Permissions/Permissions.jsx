import { useState } from 'react'
import Card from '../../../../components/Card/Card.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Input from '../../../../components/Input/Input.jsx'
import Alert from '../../../../components/Alert/Alert.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import Switch from '../../../../components/Switch/Switch.jsx'
import EmptyState from '../../../../components/EmptyState/EmptyState.jsx'
import { staff } from '../../../../data/direction.js'
import '../DirectionPage.css'
import './Permissions.css'

const modules = [
  { key: 'notes', label: 'Gestion des notes' },
  { key: 'presences', label: 'Présences' },
  { key: 'planning', label: 'Planning & emploi du temps' },
  { key: 'devoirs', label: 'Devoirs & exercices' },
  { key: 'examens', label: 'Examens & évaluations' },
  { key: 'messagerie', label: 'Messagerie avec les parents' },
  { key: 'statistiques', label: 'Statistiques' },
  { key: 'rapports', label: 'Rapports & archives' },
]

const actions = [
  { key: 'saisir_notes', label: 'Saisir les notes' },
  { key: 'valider_notes', label: 'Proposer/valider les notes' },
  { key: 'gerer_presences', label: 'Gérer les présences de ses classes' },
  { key: 'ecrire_parents', label: 'Écrire aux parents' },
  { key: 'publier_devoirs', label: 'Publier des devoirs' },
  { key: 'consulter_stats', label: 'Consulter les statistiques' },
  { key: 'exporter', label: 'Exporter des rapports' },
  { key: 'administrer', label: 'Administrer les comptes' },
]

const roleOptions = [
  { value: 'enseignant', label: 'Enseignant' },
  { value: 'classe', label: 'Chargé(e) de classe' },
  { value: 'admin', label: 'Administrateur' },
]

const subjectOptions = [
  'Mathématiques',
  'Physique-Chimie',
  'Français',
  'SVT',
  'Anglais',
  'Philosophie',
  'Histoire-Géographie',
  'EPS',
]

const roleBadge = {
  enseignant: 'neutral',
  classe: 'primary',
  admin: 'accent',
}

function Permissions() {
  const [teachers, setTeachers] = useState(
    staff.map((t, i) => ({
      id: t.id,
      name: t.name,
      subject: t.subject,
      role: i % 3 === 0 ? 'admin' : i % 2 === 0 ? 'classe' : 'enseignant',
      modules: ['notes', 'presences'].concat(i % 2 === 0 ? ['messagerie'] : []),
      actions: ['saisir_notes'].concat(i % 3 === 0 ? ['administrer'] : []),
    })),
  )

  const [form, setForm] = useState({
    name: '',
    subject: '',
    role: 'enseignant',
  })
  const [modulesOn, setModulesOn] = useState(
    Object.fromEntries(modules.map((m) => [m.key, true])),
  )
  const [actionsOn, setActionsOn] = useState(
    Object.fromEntries(actions.map((a) => [a.key, true])),
  )
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(null)

  function toggleModule(key) {
    setModulesOn((prev) => ({ ...prev, [key]: !prev[key] }))
  }
  function toggleAction(key) {
    setActionsOn((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.subject) {
      setError('Le nom et la matière sont obligatoires.')
      return
    }

    const teacher = {
      id: `t-${Date.now()}`,
      name: form.name.trim(),
      subject: form.subject,
      role: form.role,
      modules: modules.filter((m) => modulesOn[m.key]).map((m) => m.key),
      actions: actions.filter((a) => actionsOn[a.key]).map((a) => a.key),
    }
    setTeachers((prev) => [...prev, teacher])
    setAdded(teacher)
    setError(null)
    setForm({ name: '', subject: '', role: 'enseignant' })
  }

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Enseignants & permissions</h1>
          <p>
            Ajoutez des enseignants et définissez précisément les
            fonctionnalités auxquelles ils ont accès.
          </p>
        </div>
      </div>

      {added && (
        <Alert
          variant="success"
          title="Enseignant ajouté"
          onClose={() => setAdded(null)}
        >
          {added.name} ({added.subject}) a été ajouté(e) avec le rôle{' '}
          {roleOptions.find((r) => r.value === added.role)?.label}.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" title="Formulaire incomplet" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card>
        <Card.Header>Ajouter un enseignant</Card.Header>
        <Card.Body>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <Input
              id="perm-name"
              label="Nom & prénom *"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ex. Claire Mbida"
            />

            <label className="field">
              <span className="field__label" htmlFor="perm-subject">
                Matière *
              </span>
              <select
                id="perm-subject"
                className="select"
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
              >
                <option value="">Sélectionner…</option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label" htmlFor="perm-role">
                Rôle global
              </span>
              <select
                id="perm-role"
                className="select"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-grid__full">
              <div className="perm-block">
                <h3 className="perm-block__title">Fonctionnalités accessibles</h3>
                <div className="perm-grid">
                  {modules.map((m) => (
                    <Switch
                      key={m.key}
                      id={`mod-${m.key}`}
                      checked={modulesOn[m.key]}
                      onChange={() => toggleModule(m.key)}
                      label={m.label}
                    />
                  ))}
                </div>
              </div>

              <div className="perm-block">
                <h3 className="perm-block__title">Permissions détaillées</h3>
                <div className="perm-grid">
                  {actions.map((a) => (
                    <Switch
                      key={a.key}
                      id={`act-${a.key}`}
                      checked={actionsOn[a.key]}
                      onChange={() => toggleAction(a.key)}
                      label={a.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-grid__full perm-actions">
              <Button type="submit" size="lg">
                Ajouter l’enseignant
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">
          Enseignants et accès ({teachers.length})
        </h2>
        {teachers.length === 0 ? (
          <EmptyState icon="teachers" title="Aucun enseignant" />
        ) : (
          <div className="perm-table">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="perm-row">
                <div className="perm-row__head">
                  <div className="perm-row__identity">
                    <p className="perm-row__name">{teacher.name}</p>
                    <p className="perm-row__meta">{teacher.subject}</p>
                  </div>
                  <Badge variant={roleBadge[teacher.role]}>
                    {roleOptions.find((r) => r.value === teacher.role)?.label}
                  </Badge>
                </div>
                <div className="perm-row__chips">
                  {teacher.modules.length === 0 && 'Aucune fonctionnalité'}
                  {teacher.modules.map((mk) => {
                    const m = modules.find((x) => x.key === mk)
                    return m ? (
                      <span key={mk} className="perm-chip">
                        {m.label}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Permissions