import Badge from '../../../../components/Badge/Badge.jsx'
import Card from '../../../../components/Card/Card.jsx'
import { housing } from '../../../../data/housing.js'
import '../StudentPage.css'
import './Housing.css'

const rentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

const rentLabel = {
  'a-jour': 'À jour',
  'en-attente': 'En attente',
  'en-retard': 'En retard',
}

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function Housing() {
  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Logement</h1>
          <p>Informations sur votre hébergement scolaire.</p>
        </div>
      </div>

      {housing.status === 'loge' ? (
        <Card>
          <Card.Header>{housing.residence}</Card.Header>
          <Card.Body>
            <dl className="housing-details">
              <div>
                <dt>Chambre</dt>
                <dd>{housing.room}</dd>
              </div>
              <div>
                <dt>Colocataires</dt>
                <dd>{housing.roommates.join(', ')}</dd>
              </div>
              <div>
                <dt>Loyer mensuel</dt>
                <dd>{formatAmount(housing.rentAmount)}</dd>
              </div>
              <div>
                <dt>Prochaine échéance</dt>
                <dd>{formatDate(housing.nextDueDate)}</dd>
              </div>
              <div>
                <dt>Statut du loyer</dt>
                <dd>
                  <Badge variant={rentVariant[housing.rentStatus]}>
                    {rentLabel[housing.rentStatus]}
                  </Badge>
                </dd>
              </div>
            </dl>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <p>Vous n’êtes actuellement pas logé sur le campus.</p>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default Housing
