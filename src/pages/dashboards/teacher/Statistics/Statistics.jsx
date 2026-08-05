import { teacherClasses } from '../../../../data/teacherClasses.js'
import { attendanceSessions } from '../../../../data/teacherAttendance.js'
import { teacherGrades } from '../../../../data/teacherGrades.js'
import { exams, examStatusLabels } from '../../../../data/exams.js'
import { MagnitudeBarChart, StatusStackedBar } from './charts.jsx'
import '../TeacherPage.css'
import './Statistics.css'

const statusIcons = {
  'a-venir': '🕓',
  'a-corriger': '⏳',
  corrige: '✅',
}

function Statistics() {
  const attendanceByClass = teacherClasses.map((klass) => {
    const sessions = attendanceSessions.filter(
      (session) => session.classId === klass.id,
    )
    const present = sessions.reduce((sum, session) => sum + session.present, 0)
    const absent = sessions.reduce((sum, session) => sum + session.absent, 0)
    const retard = sessions.reduce((sum, session) => sum + session.retard, 0)
    const total = present + absent + retard
    return {
      label: klass.name,
      value: total > 0 ? Math.round((present / total) * 100) : 0,
    }
  })

  const averageByClass = teacherClasses.map((klass) => {
    const classGrades = teacherGrades.filter(
      (grade) => grade.classId === klass.id,
    )
    const average =
      classGrades.length > 0
        ? classGrades.reduce((sum, grade) => sum + grade.score, 0) /
          classGrades.length
        : 0
    return { label: klass.name, value: Number(average.toFixed(1)) }
  })

  const examSegments = ['a-venir', 'a-corriger', 'corrige'].map((status) => ({
    key: status,
    label: examStatusLabels[status],
    icon: statusIcons[status],
    value: exams.filter((exam) => exam.status === status).length,
  }))

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Statistiques</h1>
          <p>Vue d’ensemble de la présence, des résultats et des examens.</p>
        </div>
      </div>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">
          Présence moyenne par classe
        </h2>
        <div className="chart-card">
          <MagnitudeBarChart
            data={attendanceByClass}
            max={100}
            formatValue={(value) => `${value}%`}
          />
        </div>
      </section>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">Moyenne par classe</h2>
        <div className="chart-card">
          <MagnitudeBarChart
            data={averageByClass}
            max={20}
            formatValue={(value) => `${value}`}
          />
        </div>
      </section>

      <section className="teacher-page__section">
        <h2 className="teacher-page__section-title">
          Répartition des examens
        </h2>
        <div className="chart-card">
          <StatusStackedBar segments={examSegments} />
        </div>
      </section>
    </div>
  )
}

export default Statistics
