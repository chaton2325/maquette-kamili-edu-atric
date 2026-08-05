import { Link } from 'react-router-dom'
import Skeleton from '../../../../components/Skeleton/Skeleton.jsx'
import { children } from '../../../../data/children.js'
import { notifications } from '../../../../data/notifications.js'
import { agendaEvents } from '../../../../data/agenda.js'
import { parentProfile } from '../../../../data/parentProfile.js'
import { useMockLoad } from '../../../../hooks/useMockLoad.js'
import ChildCard from '../ChildCard.jsx'
import '../ParentPage.css'
import './Home.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
  })
}

function Home() {
  const loading = useMockLoad()
  const recentNotifications = notifications.slice(0, 3)
  const upcomingEvents = [...agendaEvents]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  if (loading) {
    return (
      <div className="parent-page">
        <div className="parent-page__header">
          <div className="parent-page__heading">
            <Skeleton variant="title" width="50%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
        <section className="parent-page__section">
          <Skeleton variant="title" width="30%" />
          <div className="home-children">
            <div className="skeleton-card anim-fade-up">
              <div className="skeleton-card__row">
                <Skeleton variant="avatar" />
                <div className="skeleton" style={{ flex: 1 }}>
                  <Skeleton variant="title" />
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
              <Skeleton variant="rect" height="64px" />
            </div>
            <div className="skeleton-card anim-fade-up" style={{ '--delay': '80ms' }}>
              <div className="skeleton-card__row">
                <Skeleton variant="avatar" />
                <div className="skeleton" style={{ flex: 1 }}>
                  <Skeleton variant="title" />
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
              <Skeleton variant="rect" height="64px" />
            </div>
            <div className="skeleton-card anim-fade-up" style={{ '--delay': '160ms' }}>
              <div className="skeleton-card__row">
                <Skeleton variant="avatar" />
                <div className="skeleton" style={{ flex: 1 }}>
                  <Skeleton variant="title" />
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
              <Skeleton variant="rect" height="64px" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Bonjour, {parentProfile.firstName} 👋</h1>
          <p>Voici un aperçu de la scolarité de vos enfants aujourd’hui.</p>
        </div>
      </div>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">Mes enfants</h2>
        <div className="home-children">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </section>

      <div className="home-columns">
        <section className="parent-page__section">
          <h2 className="parent-page__section-title">
            Notifications récentes
          </h2>
          <ul className="home-list">
            {recentNotifications.map((notification) => (
              <li key={notification.id} className="home-list__item">
                <span>{notification.text}</span>
                <span className="home-list__time">{notification.time}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard/parent/notifications"
            className="home-list__link"
          >
            Voir toutes les notifications →
          </Link>
        </section>

        <section className="parent-page__section">
          <h2 className="parent-page__section-title">Prochains événements</h2>
          <ul className="home-list">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="home-list__item">
                <span>{event.title}</span>
                <span className="home-list__time">
                  {formatDate(event.date)}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/dashboard/parent/agenda" className="home-list__link">
            Voir l’agenda complet →
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Home
