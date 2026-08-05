import Table from '../../../../components/Table/Table.jsx'
import { studentGrades } from '../../../../data/studentGrades.js'
import '../StudentPage.css'

function Grades() {
  const totalCoefficient = studentGrades.reduce(
    (sum, grade) => sum + grade.coefficient,
    0,
  )
  const average = (
    studentGrades.reduce(
      (sum, grade) => sum + grade.score * grade.coefficient,
      0,
    ) / totalCoefficient
  ).toFixed(1)

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Notes</h1>
          <p>Résultats du trimestre en cours, par matière.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Moyenne générale</span>
          <span className="stat-tile__value">{average}/20</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Matières évaluées</span>
          <span className="stat-tile__value">{studentGrades.length}</span>
        </div>
      </div>

      <section className="student-page__section">
        <Table>
          <thead>
            <tr>
              <th>Matière</th>
              <th>Enseignant</th>
              <th>Trimestre</th>
              <th>Coefficient</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {studentGrades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.subject}</td>
                <td>{grade.teacher}</td>
                <td>{grade.term}</td>
                <td>{grade.coefficient}</td>
                <td>{grade.score}/20</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Grades
