import Card from '../../../../components/Card/Card.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import { reports } from '../../../../data/direction.js'
import { reportTypeLabels } from '../../../../data/direction.js'
import { reportStatusLabels } from '../../../../data/direction.js'
import '../DirectionPage.css'

const typeIcons = {
  Effectifs: '🎓',
  Résultats: '🏆',
  Finances: '💰',
  Présences: '🗓️',
}

const statusVariant = {
  genere: 'success',
  'en-cours': 'warning',
}

function Reports() {
  const generated = reports.filter((report) => report.status === 'genere').length

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Rapports</h1>
          <p>Rapports générés et en cours de préparation.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              📄
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Rapports disponibles</span>
              <span className="kpi-card__value">{generated}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                prêts au téléchargement
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ⏳
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">En cours</span>
              <span className="kpi-card__value">
                {reports.length - generated}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                en préparation
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              🗓️
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Dernier rapport</span>
              <span className="kpi-card__value">05/08</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                Rapport de rentrée
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              🎓
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Type le plus consulté</span>
              <span className="kpi-card__value">Finances</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                budget & recouvrement
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Liste des rapports</h2>
        <div className="dir-cards-grid">
          {reports.map((report) => (
            <Card key={report.id}>
              <Card.Header className="dir-report__header">
                <span aria-hidden="true">{typeIcons[report.type]}</span>
                <Badge variant={statusVariant[report.status]}>
                  {reportStatusLabels[report.status]}
                </Badge>
              </Card.Header>
              <Card.Body>
                <p className="dir-card__meta">
                  {reportTypeLabels[report.type]} · {report.period}
                </p>
                <h3 className="dir-report__title">{report.title}</h3>
                <p className="dir-card__meta">Date : {report.date}</p>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={report.status === 'en-cours'}
                >
                  ⬇ Télécharger
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Reports