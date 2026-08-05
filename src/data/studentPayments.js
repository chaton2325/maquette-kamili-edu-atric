export const studentPayments = [
  {
    id: 'spay-1',
    label: 'Frais de scolarité — Trimestre 2',
    amount: 65000,
    dueDate: '2026-08-20',
    status: 'en-attente',
  },
  {
    id: 'spay-2',
    label: 'Cantine — Août',
    amount: 15000,
    dueDate: '2026-08-10',
    status: 'en-retard',
  },
  {
    id: 'spay-3',
    label: 'Assurance scolaire',
    amount: 8000,
    dueDate: '2026-09-01',
    status: 'a-jour',
  },
  {
    id: 'spay-4',
    label: 'Frais d’examen blanc',
    amount: 5000,
    dueDate: '2026-08-25',
    status: 'a-jour',
  },
]

export const paymentStatusLabels = {
  'a-jour': 'À jour',
  'en-attente': 'En attente',
  'en-retard': 'En retard',
}
