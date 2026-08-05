import { useState } from 'react'
import Dropdown from '../../../../components/Dropdown/Dropdown.jsx'
import Input from '../../../../components/Input/Input.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Alert from '../../../../components/Alert/Alert.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { teacherClasses } from '../../../../data/teacherClasses.js'
import { teacherStudents } from '../../../../data/teacherStudents.js'
import { teacherGrades as initialGrades } from '../../../../data/teacherGrades.js'
import '../TeacherPage.css'

function getClassName(classId) {
  return teacherClasses.find((klass) => klass.id === classId)?.name ?? '—'
}

function studentName(studentId) {
  const student = teacherStudents.find((item) => item.id === studentId)
  return student ? `${student.firstName} ${student.lastName}` : '—'
}

function Grades() {
  const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id)
  const [grades, setGrades] = useState(initialGrades)
  const [saved, setSaved] = useState(false)

  const classGrades = grades.filter(
    (grade) => grade.classId === selectedClassId,
  )
  const average =
    classGrades.length > 0
      ? (
          classGrades.reduce((sum, grade) => sum + grade.score, 0) /
          classGrades.length
        ).toFixed(1)
      : '—'

  function handleScoreChange(gradeId, value) {
    const score = Number(value)
    setGrades((prev) =>
      prev.map((grade) =>
        grade.id === gradeId ? { ...grade, score: Number.isNaN(score) ? 0 : score } : grade,
      ),
    )
    setSaved(false)
  }

  const classItems = teacherClasses.map((klass) => ({
    label: klass.name,
    onClick: () => {
      setSelectedClassId(klass.id)
      setSaved(false)
    },
  }))

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Notes</h1>
          <p>Saisie et consultation des notes par classe.</p>
        </div>
        <Dropdown
          label={getClassName(selectedClassId)}
          items={classItems}
          align="right"
        />
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">
            Moyenne de la classe — {getClassName(selectedClassId)}
          </span>
          <span className="stat-tile__value">{average}/20</span>
        </div>
      </div>

      {saved && (
        <Alert
          variant="success"
          title="Notes enregistrées"
          onClose={() => setSaved(false)}
        >
          Les notes ont été mises à jour (simulation).
        </Alert>
      )}

      <section className="teacher-page__section">
        <Table>
          <thead>
            <tr>
              <th>Élève</th>
              <th>Trimestre</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {classGrades.map((grade) => (
              <tr key={grade.id}>
                <td>{studentName(grade.studentId)}</td>
                <td>{grade.term}</td>
                <td>
                  <Input
                    aria-label={`Note de ${studentName(grade.studentId)}`}
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    size="sm"
                    value={grade.score}
                    onChange={(event) =>
                      handleScoreChange(grade.id, event.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={() => setSaved(true)}>Enregistrer les notes</Button>
      </section>
    </div>
  )
}

export default Grades
