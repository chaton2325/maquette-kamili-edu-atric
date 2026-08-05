import { Link } from 'react-router-dom'
import Skeleton from '../../../../components/Skeleton/Skeleton.jsx'
import { studentProfile } from '../../../../data/studentProfile.js'
import { studentGrades } from '../../../../data/studentGrades.js'
import { homework } from '../../../../data/homework.js'
import { studentNotifications } from '../../../../data/studentNotifications.js'
import { studentAgendaEvents } from '../../../../data/studentAgenda.js'
import { useMockLoad } from '../../../../hooks/useMockLoad.js'
import '../StudentPage.css'
import './Home.css'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
  })
}

function Home() {
  const average = (
    studentGrades.reduce((sum, grade) => sum + grade.score * grade.coefficient, 0) /
    studentGrades.reduce((sum, grade) => sum + grade.coefficient, 0)
  ).toFixed(1)

  const completedHomework = homework.filter(
    (item) => item.status === 'termine',
  ).length
  const homeworkProgress = Math.round(
    (completedHomework / homework.length) * 100,
  )
  const pendingHomework = homework.length - completedHomework

  const recentNotifications = studentNotifications.slice(0, 3)
  const upcomingEvents = [...studentAgendaEvents]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  const loading = useMockLoad()

  if (loading) {
    return (
      <div className="student-page">
        <div className="student-page__header">
          <div className="student-page__heading">
            <Skeleton variant="title" width="50%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
        <div className="stat-grid">
          <div className="skeleton-card anim-fade-up">
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="title" />
          </div>
          <div className="skeleton-card anim-fade-up" style={{ '--delay': '60ms' }}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="title" />
          </div>
          <div className="skeleton-card anim-fade-up" style={{ '--delay': '120ms' }}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="title" />
          </div>
        </div>
        <div className="home-columns">
          <div className="skeleton-card anim-fade-up">
            <Skeleton variant="title" width="60%" />
            <Skeleton count={3} variant="text" />
          </div>
          <div className="skeleton-card anim-fade-up" style={{ '--delay': '80ms' }}>
            <Skeleton variant="title" width="60%" />
            <Skeleton count={3} variant="text" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Bonjour, {studentProfile.firstName} 👋</h1>
          <p>
            {studentProfile.classLevel} · {studentProfile.school}
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Moyenne générale</span>
          <span className="stat-tile__value">{average}/20</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Devoirs en attente</span>
          <span className="stat-tile__value">{pendingHomework}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Devoirs complétés</span>
          <div className="meter">
            <div className="meter__track">
              <div
                className="meter__fill"
                style={{ width: `${homeworkProgress}%` }}
              />
            </div>
            <div className="meter__label">
              <span>
                {completedHomework}/{homework.length}
              </span>
              <span>{homeworkProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home-columns">
        <section className="student-page__section">
          <h2 className="student-page__section-title">
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
            to="/dashboard/student/notifications"
            className="home-list__link"
          >
            Voir toutes les notifications →
          </Link>
        </section>

        <section className="student-page__section">
          <h2 className="student-page__section-title">Prochains événements</h2>
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
          <Link to="/dashboard/student/agenda" className="home-list__link">
            Voir l’agenda complet →
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Home
