export const conversations = [
  {
    id: 'conv-1',
    with: 'Mme Ateba — Professeure principale (CM2)',
    childId: 'enf-1',
    unread: true,
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Bonjour, Amina a très bien participé en classe aujourd’hui.',
        time: '08:32',
      },
      {
        id: 2,
        from: 'me',
        text: 'Merci beaucoup pour ce retour, cela lui fera plaisir !',
        time: '09:10',
      },
    ],
  },
  {
    id: 'conv-2',
    with: 'M. Biya — Vie scolaire (Collège Notre-Dame)',
    childId: 'enf-2',
    unread: true,
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Yannick était absent ce matin, merci de confirmer le motif.',
        time: 'Hier, 10:15',
      },
    ],
  },
  {
    id: 'conv-3',
    with: 'Secrétariat — École Les Bourgeons',
    childId: 'enf-3',
    unread: false,
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'La sortie pédagogique est confirmée pour le 18 août.',
        time: 'Lundi, 14:02',
      },
      {
        id: 2,
        from: 'me',
        text: 'Bien reçu, merci de l’information.',
        time: 'Lundi, 14:20',
      },
    ],
  },
]
