import { useState } from 'react'
import Button from '../../../../components/Button/Button.jsx'
import {
  studentNotifications as initialNotifications,
  studentNotificationTypeIcons,
} from '../../../../data/studentNotifications.js'
import '../StudentPage.css'
import './Notifications.css'

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length

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
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <ul className="notification-list">
        {notifications.map((notification) => (
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
    </div>
  )
}

export default Notifications
