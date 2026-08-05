import { useState } from 'react'
import Input from '../../../../components/Input/Input.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Alert from '../../../../components/Alert/Alert.jsx'
import Card from '../../../../components/Card/Card.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import { children as initialChildren } from '../../../../data/children.js'
import '../ParentPage.css'
import './RegisterChild.css'

const emptyOptions = {
  firstName: '',
  lastName: '',
  gender: 'fille',
  birthDate: '',
  classLevel: '',
  school: '',
  address: '',
  phone: '',
  relation: 'Père',
}

const classOptions = [
  'Petite Section',
  'Moyenne Section',
  'Grande Section',
  'CP',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
  '6e',
  '5e',
  '4e',
  '3e',
  'Seconde',
  'Première',
  'Terminale',
]

const schoolOptions = [
  'École Bilingue La Réussite',
  'Collège Notre-Dame',
  'École Maternelle Les Bourgeons',
  'Lycée Bilingue de Yaoundé',
  'Lycée de Mvolyé',
]

const relationOptions = ['Père', 'Mère', 'Tuteur', 'Tutrice', 'Grands-parents']

const feeByLevel = {
  'Petite Section': 65000,
  'Moyenne Section': 65000,
  'Grande Section': 65000,
  CP: 75000,
  CE1: 75000,
  CE2: 75000,
  CM1: 75000,
  CM2: 75000,
  '6e': 110000,
  '5e': 110000,
  '4e': 110000,
  '3e': 110000,
  Seconde: 150000,
  Première: 150000,
  Terminale: 150000,
}

function getFee(level) {
  return feeByLevel[level] || 0
}

function formatFCFA(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}

const paymentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

function RegisterChild() {
  const [children, setChildren] = useState(initialChildren)
  const [form, setForm] = useState(emptyOptions)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(null)

  const payableChildren = children.filter(
    (child) => child.paymentStatus !== 'a-jour',
  )
  const [payChildId, setPayChildId] = useState('')
  const [omPhone, setOmPhone] = useState('')
  const [paying, setPaying] = useState(false)
  const [payingError, setPayingError] = useState(null)
  const [receipt, setReceipt] = useState(null)

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setError(null)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Le prénom et le nom de l’élève sont obligatoires.')
      return
    }
    if (!form.classLevel || !form.school) {
      setError('La classe et l’école sont obligatoires.')
      return
    }

    const child = {
      id: `enf-${Date.now()}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      avatar: form.gender === 'fille' ? '👧' : '👦',
      classLevel: form.classLevel,
      school: form.school,
      attendanceRate: 100,
      averageGrade: null,
      paymentStatus: 'en-attente',
    }

    setChildren((prev) => [child, ...prev])
    setAdded(child)
    setForm({ ...emptyOptions })
  }

  function handlePay(event) {
    event.preventDefault()
    setPayingError(null)
    setReceipt(null)

    const child = children.find((c) => c.id === payChildId)
    if (!child) {
      setPayingError('Sélectionnez un enfant à inscrire dans la liste ci-dessus.')
      return
    }
    if (!/^(\+237|237)?\s?6\d{8}$/.test(omPhone.trim())) {
      setPayingError('Saisissez un numéro Orange Money valide (ex. 6 99 00 11 22).')
      return
    }

    const fee = getFee(child.classLevel)
    const pendingAlert = window.confirm(
      `Confirmez-vous le paiement de ${formatFCFA(fee)} via Orange Money au numéro ${omPhone.trim()} ?`,
    )
    if (!pendingAlert) return

    setPaying(true)
    window.setTimeout(() => {
      const reference = `OM-9972${Math.floor(100000 + Math.random() * 899999)}`
      setChildren((prev) =>
        prev.map((c) =>
          c.id === child.id ? { ...c, paymentStatus: 'a-jour' } : c,
        ),
      )
      setAdded(null)
      setReceipt({ ...child, amount: fee, reference, phone: omPhone.trim() })
      setPayChildId('')
      setOmPhone('')
      setPaying(false)
    }, 1600)
  }

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Inscrire un élève</h1>
          <p>
            Renseignez les informations de votre enfant pour l’inscrire sur la
            plateforme.
          </p>
        </div>
      </div>

      {added && (
        <Alert
          variant="success"
          title="Inscription enregistrée 🎉"
          onClose={() => setAdded(null)}
        >
          {added.firstName} {added.lastName} ({added.classLevel} · {added.school}
          ) a été ajouté(e). Une confirmation vous sera envoyée.
        </Alert>
      )}

      {error && (
        <Alert
          variant="danger"
          title="Formulaire incomplet"
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Card>
        <Card.Header>Nouvelle inscription</Card.Header>
        <Card.Body>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <Input
              id="reg-firstname"
              label="Prénom de l’élève *"
              value={form.firstName}
              onChange={handleChange('firstName')}
              placeholder="Ex. Amina"
            />
            <Input
              id="reg-lastname"
              label="Nom de l’élève *"
              value={form.lastName}
              onChange={handleChange('lastName')}
              placeholder="Ex. Koné"
            />

            <label className="field">
              <span className="field__label" htmlFor="reg-gender">
                Sexe
              </span>
              <select
                id="reg-gender"
                className="select"
                value={form.gender}
                onChange={handleChange('gender')}
              >
                <option value="fille">Fille</option>
                <option value="garcon">Garçon</option>
              </select>
            </label>

            <Input
              id="reg-birthdate"
              type="date"
              label="Date de naissance"
              value={form.birthDate}
              onChange={handleChange('birthDate')}
            />

            <label className="field">
              <span className="field__label" htmlFor="reg-class">
                Classe / niveau *
              </span>
              <select
                id="reg-class"
                className="select"
                value={form.classLevel}
                onChange={handleChange('classLevel')}
              >
                <option value="">Sélectionner…</option>
                {classOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label" htmlFor="reg-school">
                École *
              </span>
              <select
                id="reg-school"
                className="select"
                value={form.school}
                onChange={handleChange('school')}
              >
                <option value="">Sélectionner…</option>
                {schoolOptions.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </label>

            <Input
              id="reg-address"
              label="Adresse du domicile"
              value={form.address}
              onChange={handleChange('address')}
              placeholder="Quartier, ville"
            />
            <Input
              id="reg-phone"
              label="Téléphone (contact d’urgence)"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="+237 …"
            />

            <label className="field">
              <span className="field__label" htmlFor="reg-relation">
                Lien de parenté
              </span>
              <select
                id="reg-relation"
                className="select"
                value={form.relation}
                onChange={handleChange('relation')}
              >
                {relationOptions.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-grid__full register-actions">
              <Button type="submit" size="lg">
                Enregistrer l’inscription
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setForm({ ...emptyOptions })}
              >
                Réinitialiser
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">Enfants inscrits</h2>
        <div className="children-grid">
          {children.map((child) => (
            <div key={child.id} className="register-card anim-fade-up">
              <span className="register-card__avatar" aria-hidden="true">
                {child.avatar}
              </span>
              <div className="register-card__info">
                <p className="register-card__name">
                  {child.firstName} {child.lastName}
                </p>
                <p className="register-card__meta">
                  {child.classLevel} · {child.school}
                </p>
              </div>
              <Badge variant={paymentVariant[child.paymentStatus]}>
                {child.paymentStatus === 'a-jour' && 'Inscrit(e)'}
                {child.paymentStatus === 'en-attente' && 'En attente'}
                {child.paymentStatus === 'en-retard' && 'À régulariser'}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <Card className="register-card--om">
        <Card.Header>
          <span className="om-header">
            <span className="om-badge" aria-hidden="true">
              🧡
            </span>
            Payer les frais de scolarité via Orange Money
          </span>
        </Card.Header>
        <Card.Body>
          <p className="om-intro">
            Réglez les frais d’inscription et de scolarité de votre enfant
            directement depuis la plateforme. La quittance est générée
            automatiquement.
          </p>

          {receipt && (
            <Alert
              variant="success"
              title="Paiement accepté ✅"
              onClose={() => setReceipt(null)}
            >
              {receipt.firstName} {receipt.lastName} est maintenant{' '}
              <strong>inscrit(e)</strong>. Montant réglé :{' '}
              <strong>{formatFCFA(receipt.amount)}</strong> — Référence :{' '}
              <strong>{receipt.reference}</strong> (Orange Money{' '}
              {receipt.phone}).
            </Alert>
          )}

          {payingError && (
            <Alert
              variant="danger"
              title="Paiement impossible"
              onClose={() => setPayingError(null)}
            >
              {payingError}
            </Alert>
          )}

          <form className="om-form" onSubmit={handlePay} noValidate>
            <label className="field">
              <span className="field__label" htmlFor="om-child">
                Élève à inscrire
              </span>
              <select
                id="om-child"
                className="select"
                value={payChildId}
                onChange={(e) => {
                  setPayChildId(e.target.value)
                  setReceipt(null)
                }}
              >
                <option value="">Sélectionner un élève…</option>
                {payableChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName} ({child.classLevel}) —{' '}
                    {formatFCFA(getFee(child.classLevel))}
                  </option>
                ))}
                {payableChildren.length === 0 && (
                  <option value="" disabled>
                    Aucun élève en attente de paiement
                  </option>
                )}
              </select>
            </label>

            <Input
              id="om-phone"
              label="Numéro Orange Money"
              type="tel"
              value={omPhone}
              disabled={paying}
              onChange={(e) => setOmPhone(e.target.value)}
              placeholder="6 99 00 11 22"
              helperText="Vous recevrez un code de confirmation sur ce numéro (simulation)."
            />

            <div className="om-summary">
              <span className="om-summary__label">Montant à payer</span>
              <span className="om-summary__amount">
                {payChildId
                  ? formatFCFA(
                      getFee(
                        children.find((c) => c.id === payChildId)?.classLevel,
                      ),
                    )
                  : '—'}
              </span>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={paying}
              className={paying ? 'btn--loading' : ''}
            >
              {paying
                ? 'Confirmation en cours…'
                : payChildId
                  ? `Payer ${formatFCFA(
                      getFee(
                        children.find((c) => c.id === payChildId)?.classLevel,
                      ),
                    )}`
                  : 'Payer via Orange Money'}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default RegisterChild