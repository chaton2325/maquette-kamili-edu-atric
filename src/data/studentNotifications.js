export const studentNotifications = [
  {
    id: 'snotif-1',
    type: 'note',
    text: 'Nouvelle note publiée en Mathématiques.',
    time: 'Il y a 1h',
    read: false,
  },
  {
    id: 'snotif-2',
    type: 'devoir',
    text: 'Devoir de Français à rendre demain.',
    time: 'Il y a 3h',
    read: false,
  },
  {
    id: 'snotif-3',
    type: 'bibliotheque',
    text: '« Le Petit Prince » à retourner dans 3 jours.',
    time: 'Hier',
    read: true,
  },
  {
    id: 'snotif-4',
    type: 'paiement',
    text: 'Paiement en retard — Cantine (Août).',
    time: 'Hier',
    read: false,
  },
  {
    id: 'snotif-5',
    type: 'message',
    text: 'Nouveau message de M. Fotso.',
    time: 'Il y a 2 jours',
    read: true,
  },
]

export const studentNotificationTypeIcons = {
  note: '📝',
  devoir: '📚',
  bibliotheque: '📖',
  paiement: '💳',
  message: '💬',
}
