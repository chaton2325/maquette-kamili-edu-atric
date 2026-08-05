import Card from '../../../../components/Card/Card.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { schoolClasses } from '../../../../data/direction.js'
import '../DirectionPage.css'

function occupancyClass(percent) {
  if (percent >= 95) return 'dir-fill__bar--danger'
  if (percent >= 85) return 'dir-fill__bar--warning'
  return ''
}

function Classes() {
  const averageSize = Math.round(
    schoolClasses.reduce((sum, klass) => sum + klass.students, 0) /
      schoolClasses.length,
  )
  const maxClass = schoolClasses.reduce(
    (max, klass) => (klass.students > max.students ? klass : max),
    schoolClasses[0],
  )

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Classes</h1>
          <p>Effectifs et taux d’occupation par classe.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              🏫
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Classes</span>
              <span className="kpi-card__value">{schoolStats.classes}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                {schoolStats.classrooms} salles disponibles
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              📊
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Effectif moyen</span>
              <span className="kpi-card__value">{averageSize}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                élèves par classe
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              🔝
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Classe la plus chargée</span>
              <span className="kpi-card__value">
                {maxClass.name} · {maxClass.students}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                {Math.round((maxClass.students / maxClass.capacity) * 100)} % occupée
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              🎯
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Capacité moyenne</span>
              <span className="kpi-card__value">54</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                élèves / classe
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Détail des classes</h2>
        <div className="dir-cards-grid">
          {schoolClasses.map((klass) => {
            const occupancy = Math.round(
              (klass.students / klass.capacity) * 100,
            )
            return (
              <Card key={klass.id}>
                <Card.Header className="dir-class__header">
                  <span>{klass.name}</span>
                  <Badge variant="neutral">{klass.level}</Badge>
                </Card.Header>
                <Card.Body>
                  <p className="dir-card__meta">Enseignant : {klass.teacher}</p>
                  <p className="dir-card__count">{klass.students} élèves</p>
                  <div className="dir-card__row">
                    <span>Occupation</span>
                    <span>{occupancy} %</span>
                  </div>
                  <div className="dir-fill">
                    <div
                      className={`dir-fill__bar ${occupancyClass(occupancy)}`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Classes