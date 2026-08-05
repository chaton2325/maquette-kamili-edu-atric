export const attendanceRecords = [
  { id: 'att-1', childId: 'enf-1', date: '2026-08-03', status: 'present' },
  { id: 'att-2', childId: 'enf-1', date: '2026-08-04', status: 'present' },
  { id: 'att-3', childId: 'enf-1', date: '2026-08-05', status: 'present' },
  {
    id: 'att-4',
    childId: 'enf-2',
    date: '2026-08-03',
    status: 'absent',
    reason: 'Maladie',
  },
  {
    id: 'att-5',
    childId: 'enf-2',
    date: '2026-08-04',
    status: 'retard',
    reason: 'Transport',
  },
  { id: 'att-6', childId: 'enf-2', date: '2026-08-05', status: 'present' },
  { id: 'att-7', childId: 'enf-3', date: '2026-08-03', status: 'present' },
  { id: 'att-8', childId: 'enf-3', date: '2026-08-04', status: 'present' },
  {
    id: 'att-9',
    childId: 'enf-3',
    date: '2026-08-05',
    status: 'retard',
    reason: 'Rendez-vous médical',
  },
]

export const attendanceStatusLabels = {
  present: 'Présent',
  absent: 'Absent',
  retard: 'Retard',
}
