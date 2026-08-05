export const notifications = [
  {
    id: 'notif-1',
    type: 'paiement',
    text: 'Paiement en retard pour Yannick — Cantine (Août).',
    time: 'Il y a 2h',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'note',
    text: 'Nouvelle note publiée pour Amina en Mathématiques.',
    time: 'Il y a 5h',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'presence',
    text: 'Absence enregistrée pour Yannick le 3 août.',
    time: 'Hier',
    read: true,
  },
  {
    id: 'notif-4',
    type: 'message',
    text: 'Nouveau message du secrétariat de l’École Les Bourgeons.',
    time: 'Lundi',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'agenda',
    text: 'Réunion parents-professeurs ajoutée à l’agenda.',
    time: 'Il y a 3 jours',
    read: true,
  },
]

export const notificationTypeIcons = {
  paiement: '💰',
  note: '📝',
  presence: '🗓️',
  message: '💬',
  agenda: '📅',
}
