export const agendaEvents = [
  {
    id: 'evt-1',
    date: '2026-08-10',
    title: 'Réunion parents-professeurs',
    childId: 'enf-1',
    type: 'reunion',
  },
  {
    id: 'evt-2',
    date: '2026-08-12',
    title: 'Examen de Mathématiques',
    childId: 'enf-2',
    type: 'examen',
  },
  {
    id: 'evt-3',
    date: '2026-08-18',
    title: 'Sortie pédagogique — Musée national',
    childId: 'enf-3',
    type: 'sortie',
  },
  {
    id: 'evt-4',
    date: '2026-08-22',
    title: 'Remise des bulletins',
    childId: 'enf-1',
    type: 'reunion',
  },
  {
    id: 'evt-5',
    date: '2026-08-25',
    title: 'Début des vacances scolaires',
    childId: null,
    type: 'ferie',
  },
]

export const agendaTypeLabels = {
  reunion: 'Réunion',
  examen: 'Examen',
  sortie: 'Sortie',
  ferie: 'Congé',
}
