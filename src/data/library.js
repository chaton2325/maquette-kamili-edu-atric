export const libraryBooks = [
  {
    id: 'lib-1',
    title: 'Physique Terminale D',
    author: 'Collection Excellence',
    status: 'emprunte',
    dueDate: '2026-08-20',
  },
  {
    id: 'lib-2',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    status: 'emprunte',
    dueDate: '2026-08-15',
  },
  {
    id: 'lib-3',
    title: 'Mathématiques — Analyse et probabilités',
    author: 'Collection CIAM',
    status: 'disponible',
  },
  {
    id: 'lib-4',
    title: 'Une si longue lettre',
    author: 'Mariama Bâ',
    status: 'disponible',
  },
  {
    id: 'lib-5',
    title: 'Histoire du Cameroun',
    author: 'Collection Nathan',
    status: 'reserve',
  },
]

export const libraryStatusLabels = {
  emprunte: 'Emprunté',
  disponible: 'Disponible',
  reserve: 'Réservé',
}
