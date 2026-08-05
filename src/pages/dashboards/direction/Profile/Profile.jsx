import { useState } from 'react'
import Card from '../../../../components/Card/Card.jsx'
import Input from '../../../../components/Input/Input.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Alert from '../../../../components/Alert/Alert.jsx'
import { directionProfile } from '../../../../data/direction.js'
import '../DirectionPage.css'

function Profile() {
  const [form, setForm] = useState(directionProfile)
  const [saved, setSaved] = useState(false)

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setSaved(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Profil</h1>
          <p>Gérez les informations de votre compte Direction.</p>
        </div>
      </div>

      <Card>
        <Card.Body>
          <form className="dir-profile-form" onSubmit={handleSubmit}>
            <div className="dir-profile-form__avatar" aria-hidden="true">
              {form.avatar}
            </div>

            {saved && (
              <Alert
                variant="success"
                title="Modifications enregistrées"
                onClose={() => setSaved(false)}
              >
                Vos informations ont été mises à jour (simulation).
              </Alert>
            )}

            <div className="dir-profile-form__grid">
              <Input
                id="firstName"
                label="Prénom"
                value={form.firstName}
                onChange={handleChange('firstName')}
              />
              <Input
                id="lastName"
                label="Nom"
                value={form.lastName}
                onChange={handleChange('lastName')}
              />
              <Input
                id="title"
                label="Fonction"
                value={form.title}
                onChange={handleChange('title')}
              />
              <Input
                id="email"
                type="email"
                label="Adresse email"
                value={form.email}
                onChange={handleChange('email')}
              />
              <Input
                id="phone"
                label="Téléphone"
                value={form.phone}
                onChange={handleChange('phone')}
              />
              <Input id="school" label="Établissement" value={form.school} disabled />
              <div className="dir-profile-form__full">
                <Input
                  id="address"
                  label="Adresse"
                  value={form.address}
                  onChange={handleChange('address')}
                />
              </div>
            </div>

            <Button type="submit">Enregistrer les modifications</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile