import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Tag from '../../../../components/Tag/Tag.jsx'
import Button from '../../../../components/Button/Button.jsx'
import {
  homework as initialHomework,
  homeworkStatusLabels,
} from '../../../../data/homework.js'
import '../StudentPage.css'
import './Homework.css'

const statusVariant = {
  'a-faire': 'neutral',
  'en-cours': 'warning',
  termine: 'success',
}

const actionLabel = {
  'a-faire': 'Commencer',
  'en-cours': 'Marquer comme terminé',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
}

function Homework() {
  const [items, setItems] = useState(initialHomework)

  const sorted = [...items].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  )

  function handleAdvance(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (item.status === 'a-faire') return { ...item, status: 'en-cours' }
        if (item.status === 'en-cours') return { ...item, status: 'termine' }
        return item
      }),
    )
  }

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Devoirs</h1>
          <p>Suivi des devoirs et de leurs échéances.</p>
        </div>
      </div>

      <ul className="homework-list">
        {sorted.map((item) => (
          <li key={item.id} className="homework-item">
            <div className="homework-item__main">
              <Tag variant="neutral">{item.subject}</Tag>
              <p className="homework-item__title">{item.title}</p>
              <p className="homework-item__due">
                À rendre le {formatDate(item.dueDate)}
              </p>
            </div>
            <div className="homework-item__side">
              <Badge variant={statusVariant[item.status]}>
                {homeworkStatusLabels[item.status]}
              </Badge>
              {item.status !== 'termine' && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAdvance(item.id)}
                >
                  {actionLabel[item.status]}
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Homework
