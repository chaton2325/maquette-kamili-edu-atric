import { useState } from 'react'
import Button from '../../../../components/Button/Button.jsx'
import EmptyState from '../../../../components/EmptyState/EmptyState.jsx'
import {
  studentNotifications as initialNotifications,
  studentNotificationTypeIcons,
} from '../../../../data/studentNotifications.js'
import '../StudentPage.css'
import './Notifications.css'

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length

  const visible = notifications.filter((notification) =>
    filter === 'unread' ? !notification.read : true,
  )

  function markAllRead() {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    )
  }

  function markRead(id) {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    )
  }

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Notifications</h1>
          <p>
            {unreadCount > 0
              ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}.`
              : 'Vous êtes à jour.'}
          </p>
        </div>
        <div className="notification-toolbar">
          <div className="tabs" role="group" aria-label="Filtrer les notifications">
            <button
              type="button"
              className={`tabs__tab${filter === 'all' ? ' tabs__tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Toutes
            </button>
            <button
              type="button"
              className={`tabs__tab${filter === 'unread' ? ' tabs__tab--active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Non lues{unreadCount > 0 ? ` (${unreadCount})` : ''}
            </button>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon="notifications"
          title={filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
          description={
            filter === 'unread'
              ? 'Vous avez tout lu. Vous retrouverez ici vos prochaines notifications.'
              : 'Vous retrouverez ici vos prochaines notifications.'
          }
          action={
            <Button variant="secondary" size="sm" onClick={() => setFilter('all')}>
              Voir toutes les notifications
            </Button>
          }
          className="anim-fade-up"
        />
      ) : (
        <ul className="notification-list">
          {visible.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item${
                notification.read ? '' : ' notification-item--unread'
              }`}
              onClick={() => markRead(notification.id)}
            >
              <span className="notification-item__icon" aria-hidden="true">
                {studentNotificationTypeIcons[notification.type]}
              </span>
              <span className="notification-item__content">
                <span className="notification-item__text">
                  {notification.text}
                </span>
                <span className="notification-item__time">
                  {notification.time}
                </span>
              </span>
              {!notification.read && (
                <span className="notification-item__dot" aria-label="Non lu" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications
