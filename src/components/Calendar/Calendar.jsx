import './Calendar.css'

function isoKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toIso(d) {
  return d instanceof Date ? isoKey(d) : String(d)
}

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function Calendar({
  date = new Date(),
  events = [],
  selectedDate,
  onSelect,
  className = '',
}) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const startOffset = (firstDay.getDay() + 6) % 7

  const cells = []
  for (let i = 0; i < startOffset; i += 1) cells.push(null)
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d)

  const todayKey = isoKey(new Date())

  const eventMap = {}
  for (const ev of events) {
    const key = toIso(ev.date)
    if (!eventMap[key]) eventMap[key] = []
    eventMap[key].push(ev)
  }

  const selectedKey = selectedDate ? toIso(selectedDate) : null

  return (
    <div className={`calendar ${className}`.trim()}>
      <div className="calendar__header">
        <span className="calendar__title">
          {MONTHS[month]} {year}
        </span>
      </div>

      <div className="calendar__grid" aria-hidden="true">
        {WEEKDAYS.map((day, i) => (
          <div className="calendar__weekday" key={i}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__grid">
        {cells.map((day, index) => {
          if (day === null) {
            return <div className="calendar__cell" key={`empty-${index}`} />
          }

          const iso = isoKey(new Date(year, month, day))
          const dayEvents = eventMap[iso] || []
          const isToday = iso === todayKey
          const isSelected = selectedKey === iso

          return (
            <button
              type="button"
              key={iso}
              className={[
                'calendar__cell',
                'calendar__cell--button',
                isToday ? 'calendar__cell--today' : '',
                isSelected ? 'calendar__cell--selected' : '',
                dayEvents.length > 0 ? 'calendar__cell--has-events' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={`${day} ${MONTHS[month]} ${year}${
                dayEvents.length ? `, ${dayEvents.length} événement(s)` : ''
              }`}
              onClick={() => onSelect?.(new Date(year, month, day))}
            >
              <span className="calendar__day">{day}</span>
              {dayEvents.length > 0 && (
                <span className="calendar__dots">
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span
                      className={`calendar__dot calendar__dot--${ev.variant || 'primary'}`}
                      key={i}
                    />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar