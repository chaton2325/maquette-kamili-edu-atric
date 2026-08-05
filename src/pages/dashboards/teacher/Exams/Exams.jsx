import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { exams as initialExams, examStatusLabels } from '../../../../data/exams.js'
import '../TeacherPage.css'

const statusVariant = {
  'a-venir': 'neutral',
  'a-corriger': 'warning',
  corrige: 'success',
}

function getClassName(classId) {
  return teacherClasses.find((klass) => klass.id === classId)?.name ?? '—'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Exams() {
  const [exams, setExams] = useState(initialExams)

  const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date))

  function markCorrected(id) {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id ? { ...exam, status: 'corrige' } : exam,
      ),
    )
  }

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Examens</h1>
          <p>Devoirs surveillés et interrogations par classe.</p>
        </div>
      </div>

      <section className="teacher-page__section">
        <Table>
          <thead>
            <tr>
              <th>Classe</th>
              <th>Intitulé</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((exam) => (
              <tr key={exam.id}>
                <td>{getClassName(exam.classId)}</td>
                <td>{exam.title}</td>
                <td>{formatDate(exam.date)}</td>
                <td>
                  <Badge variant={statusVariant[exam.status]}>
                    {examStatusLabels[exam.status]}
                  </Badge>
                </td>
                <td>
                  {exam.status === 'a-corriger' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => markCorrected(exam.id)}
                    >
                      Marquer corrigé
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Exams
