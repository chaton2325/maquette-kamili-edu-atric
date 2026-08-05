import './Icon.css'

const ICONS = {
  home: '🏠',
  dashboard: '📊',
  stats: '📈',
  children: '🎓',
  payments: '💳',
  attendance: '🗓️',
  grades: '📝',
  results: '🏆',
  agenda: '📅',
  library: '📖',
  messages: '💬',
  notifications: '🔔',
  profile: '👤',
  timetable: '🗓️',
  homework: '📚',
  housing: '🏘️',
  scholarships: '🏅',
  wallet: '👛',
  exams: '📋',
  planning: '🧭',
  parents: '👨‍👩‍👧',
  logbook: '📓',
  classes: '🏫',
  enrollments: '🧑‍🎓',
  teachers: '👩‍🏫',
  finances: '💰',
  charts: '📊',
  alerts: '🚨',
  reports: '📄',
  supervision: '🛰️',
  ministry: '🏛️',
  search: '🔍',
  bell: '🔔',
  calendar: '📅',
  check: '✅',
  warning: '⚠️',
  error: '⛔',
  info: 'ℹ️',
  plus: '➕',
  edit: '✏️',
  trash: '🗑️',
  chevron: '▸',
  more: '⋯',
}

function Icon({ name, size = 'md', className = '', ...rest }) {
  const glyph = ICONS[name] || name
  const classes = ['icon', `icon--${size}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes} role="img" aria-hidden="true" {...rest}>
      {glyph}
    </span>
  )
}

export default Icon