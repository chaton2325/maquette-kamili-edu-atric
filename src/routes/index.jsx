import { createBrowserRouter } from 'react-router-dom'
import EmptyLayout from '../layouts/EmptyLayout/EmptyLayout.jsx'
import AuthLayout from '../layouts/AuthLayout/AuthLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout.jsx'
import Home from '../pages/Home/Home.jsx'
import Login from '../pages/auth/Login/Login.jsx'
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword.jsx'
import Otp from '../pages/auth/Otp/Otp.jsx'
import RoleSelection from '../pages/auth/RoleSelection/RoleSelection.jsx'
import TeacherAdminDashboard from '../pages/dashboards/teacher-admin/TeacherAdminDashboard.jsx'
import VisitorDashboard from '../pages/dashboards/visitor/VisitorDashboard.jsx'
import ParentSidebar from '../pages/dashboards/parent/ParentSidebar.jsx'
import ParentTopbar from '../pages/dashboards/parent/ParentTopbar.jsx'
import ParentHome from '../pages/dashboards/parent/Home/Home.jsx'
import ParentOverview from '../pages/dashboards/parent/Overview/Overview.jsx'
import ParentStatistics from '../pages/dashboards/parent/Statistics/Statistics.jsx'
import ParentChildren from '../pages/dashboards/parent/Children/Children.jsx'
import ParentPayments from '../pages/dashboards/parent/Payments/Payments.jsx'
import ParentAttendance from '../pages/dashboards/parent/Attendance/Attendance.jsx'
import ParentGrades from '../pages/dashboards/parent/Grades/Grades.jsx'
import ParentResults from '../pages/dashboards/parent/Results/Results.jsx'
import ParentAgenda from '../pages/dashboards/parent/Agenda/Agenda.jsx'
import ParentMessages from '../pages/dashboards/parent/Messages/Messages.jsx'
import ParentNotifications from '../pages/dashboards/parent/Notifications/Notifications.jsx'
import ParentProfile from '../pages/dashboards/parent/Profile/Profile.jsx'
import StudentSidebar from '../pages/dashboards/student/StudentSidebar.jsx'
import StudentTopbar from '../pages/dashboards/student/StudentTopbar.jsx'
import StudentHome from '../pages/dashboards/student/Home/Home.jsx'
import StudentGrades from '../pages/dashboards/student/Grades/Grades.jsx'
import StudentTimetable from '../pages/dashboards/student/Timetable/Timetable.jsx'
import StudentHomework from '../pages/dashboards/student/Homework/Homework.jsx'
import StudentLibrary from '../pages/dashboards/student/Library/Library.jsx'
import StudentHousing from '../pages/dashboards/student/Housing/Housing.jsx'
import StudentScholarships from '../pages/dashboards/student/Scholarships/Scholarships.jsx'
import StudentPayments from '../pages/dashboards/student/Payments/Payments.jsx'
import StudentWallet from '../pages/dashboards/student/Wallet/Wallet.jsx'
import StudentMessages from '../pages/dashboards/student/Messages/Messages.jsx'
import StudentAgenda from '../pages/dashboards/student/Agenda/Agenda.jsx'
import StudentNotifications from '../pages/dashboards/student/Notifications/Notifications.jsx'
import StudentProfile from '../pages/dashboards/student/Profile/Profile.jsx'
import TeacherSidebar from '../pages/dashboards/teacher/TeacherSidebar.jsx'
import TeacherTopbar from '../pages/dashboards/teacher/TeacherTopbar.jsx'
import TeacherClasses from '../pages/dashboards/teacher/Classes/Classes.jsx'
import TeacherAttendance from '../pages/dashboards/teacher/Attendance/Attendance.jsx'
import TeacherGrades from '../pages/dashboards/teacher/Grades/Grades.jsx'
import TeacherLogbook from '../pages/dashboards/teacher/Logbook/Logbook.jsx'
import TeacherPlanning from '../pages/dashboards/teacher/Planning/Planning.jsx'
import TeacherParents from '../pages/dashboards/teacher/Parents/Parents.jsx'
import TeacherMessages from '../pages/dashboards/teacher/Messages/Messages.jsx'
import TeacherExams from '../pages/dashboards/teacher/Exams/Exams.jsx'
import TeacherStatistics from '../pages/dashboards/teacher/Statistics/Statistics.jsx'
import TeacherProfile from '../pages/dashboards/teacher/Profile/Profile.jsx'
import DirectionSidebar from '../pages/dashboards/direction/DirectionSidebar.jsx'
import DirectionTopbar from '../pages/dashboards/direction/DirectionTopbar.jsx'
import DirectionHome from '../pages/dashboards/direction/Home/Home.jsx'
import DirectionEnrollments from '../pages/dashboards/direction/Enrollments/Enrollments.jsx'
import DirectionTeachers from '../pages/dashboards/direction/Teachers/Teachers.jsx'
import DirectionClasses from '../pages/dashboards/direction/Classes/Classes.jsx'
import DirectionAttendance from '../pages/dashboards/direction/Attendance/Attendance.jsx'
import DirectionResults from '../pages/dashboards/direction/Results/Results.jsx'
import DirectionPayments from '../pages/dashboards/direction/Payments/Payments.jsx'
import DirectionFinances from '../pages/dashboards/direction/Finances/Finances.jsx'
import DirectionCharts from '../pages/dashboards/direction/Charts/Charts.jsx'
import DirectionAlerts from '../pages/dashboards/direction/Alerts/Alerts.jsx'
import DirectionReports from '../pages/dashboards/direction/Reports/Reports.jsx'
import DirectionProfile from '../pages/dashboards/direction/Profile/Profile.jsx'
import MinistrySidebar from '../pages/dashboards/ministry/MinistrySidebar.jsx'
import MinistryTopbar from '../pages/dashboards/ministry/MinistryTopbar.jsx'
import MinistrySupervision from '../pages/dashboards/ministry/Supervision.jsx'
import MinistryCharts from '../pages/dashboards/ministry/Graphiques.jsx'
import MinistryAlerts from '../pages/dashboards/ministry/Alerts.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EmptyLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'otp', element: <Otp /> },
    ],
  },
  {
    path: '/auth/role',
    element: <EmptyLayout />,
    children: [{ index: true, element: <RoleSelection /> }],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'teacher-admin', element: <TeacherAdminDashboard /> },
      { path: 'visitor', element: <VisitorDashboard /> },
    ],
  },
  {
    path: '/dashboard/parent',
    element: (
      <DashboardLayout sidebar={<ParentSidebar />} topbar={<ParentTopbar />} />
    ),
    children: [
      { index: true, element: <ParentHome /> },
      { path: 'overview', element: <ParentOverview /> },
      { path: 'statistics', element: <ParentStatistics /> },
      { path: 'children', element: <ParentChildren /> },
      { path: 'payments', element: <ParentPayments /> },
      { path: 'attendance', element: <ParentAttendance /> },
      { path: 'grades', element: <ParentGrades /> },
      { path: 'results', element: <ParentResults /> },
      { path: 'agenda', element: <ParentAgenda /> },
      { path: 'messages', element: <ParentMessages /> },
      { path: 'notifications', element: <ParentNotifications /> },
      { path: 'profile', element: <ParentProfile /> },
    ],
  },
  {
    path: '/dashboard/student',
    element: (
      <DashboardLayout
        sidebar={<StudentSidebar />}
        topbar={<StudentTopbar />}
      />
    ),
    children: [
      { index: true, element: <StudentHome /> },
      { path: 'grades', element: <StudentGrades /> },
      { path: 'timetable', element: <StudentTimetable /> },
      { path: 'homework', element: <StudentHomework /> },
      { path: 'library', element: <StudentLibrary /> },
      { path: 'housing', element: <StudentHousing /> },
      { path: 'scholarships', element: <StudentScholarships /> },
      { path: 'payments', element: <StudentPayments /> },
      { path: 'wallet', element: <StudentWallet /> },
      { path: 'messages', element: <StudentMessages /> },
      { path: 'agenda', element: <StudentAgenda /> },
      { path: 'notifications', element: <StudentNotifications /> },
      { path: 'profile', element: <StudentProfile /> },
    ],
  },
  {
    path: '/dashboard/teacher',
    element: (
      <DashboardLayout
        sidebar={<TeacherSidebar />}
        topbar={<TeacherTopbar />}
      />
    ),
    children: [
      { index: true, element: <TeacherClasses /> },
      { path: 'attendance', element: <TeacherAttendance /> },
      { path: 'grades', element: <TeacherGrades /> },
      { path: 'logbook', element: <TeacherLogbook /> },
      { path: 'planning', element: <TeacherPlanning /> },
      { path: 'parents', element: <TeacherParents /> },
      { path: 'messages', element: <TeacherMessages /> },
      { path: 'exams', element: <TeacherExams /> },
      { path: 'statistics', element: <TeacherStatistics /> },
      { path: 'profile', element: <TeacherProfile /> },
    ],
  },
  {
    path: '/dashboard/direction',
    element: (
      <DashboardLayout
        sidebar={<DirectionSidebar />}
        topbar={<DirectionTopbar />}
      />
    ),
    children: [
      { index: true, element: <DirectionHome /> },
      { path: 'enrollments', element: <DirectionEnrollments /> },
      { path: 'teachers', element: <DirectionTeachers /> },
      { path: 'classes', element: <DirectionClasses /> },
      { path: 'attendance', element: <DirectionAttendance /> },
      { path: 'results', element: <DirectionResults /> },
      { path: 'payments', element: <DirectionPayments /> },
      { path: 'finances', element: <DirectionFinances /> },
      { path: 'charts', element: <DirectionCharts /> },
      { path: 'alerts', element: <DirectionAlerts /> },
      { path: 'reports', element: <DirectionReports /> },
      { path: 'profile', element: <DirectionProfile /> },
    ],
  },
  {
    path: '/dashboard/ministry',
    element: (
      <DashboardLayout
        sidebar={<MinistrySidebar />}
        topbar={<MinistryTopbar />}
      />
    ),
    children: [
      { index: true, element: <MinistrySupervision /> },
      { path: 'charts', element: <MinistryCharts /> },
      { path: 'alerts', element: <MinistryAlerts /> },
    ],
  },
])
