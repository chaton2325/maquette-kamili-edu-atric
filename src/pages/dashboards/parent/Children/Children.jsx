import { useState } from 'react'
import ChildCard from '../ChildCard.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import { children } from '../../../../data/children.js'
import { paymentStatusLabels } from '../../../../data/payments.js'
import '../ParentPage.css'
import './Children.css'

const paymentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

function Children() {
  const [selectedChild, setSelectedChild] = useState(null)

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Mes enfants</h1>
          <p>Gérez les profils de vos enfants inscrits sur la plateforme.</p>
        </div>
      </div>

      <div className="children-grid">
        {children.map((child) => (
          <ChildCard
            key={child.id}
            child={child}
            onClick={() => setSelectedChild(child)}
          />
        ))}
      </div>

      <Modal
        open={Boolean(selectedChild)}
        onClose={() => setSelectedChild(null)}
        title={
          selectedChild
            ? `${selectedChild.firstName} ${selectedChild.lastName}`
            : ''
        }
        footer={
          <Button variant="secondary" onClick={() => setSelectedChild(null)}>
            Fermer
          </Button>
        }
      >
        {selectedChild && (
          <div className="child-detail">
            <span className="child-detail__avatar" aria-hidden="true">
              {selectedChild.avatar}
            </span>
            <dl className="child-detail__list">
              <div>
                <dt>Classe</dt>
                <dd>{selectedChild.classLevel}</dd>
              </div>
              <div>
                <dt>École</dt>
                <dd>{selectedChild.school}</dd>
              </div>
              <div>
                <dt>Présence</dt>
                <dd>{selectedChild.attendanceRate}%</dd>
              </div>
              <div>
                <dt>Moyenne générale</dt>
                <dd>
                  {selectedChild.averageGrade
                    ? `${selectedChild.averageGrade}/20`
                    : '—'}
                </dd>
              </div>
              <div>
                <dt>Paiements</dt>
                <dd>
                  <Badge variant={paymentVariant[selectedChild.paymentStatus]}>
                    {paymentStatusLabels[selectedChild.paymentStatus]}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Children
