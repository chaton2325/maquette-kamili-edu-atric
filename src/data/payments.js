export const payments = [
  {
    id: 'pay-1',
    childId: 'enf-1',
    label: 'Frais de scolarité — Trimestre 2',
    amount: 75000,
    dueDate: '2026-09-15',
    status: 'a-jour',
  },
  {
    id: 'pay-2',
    childId: 'enf-2',
    label: 'Frais de scolarité — Trimestre 2',
    amount: 65000,
    dueDate: '2026-08-20',
    status: 'en-attente',
  },
  {
    id: 'pay-3',
    childId: 'enf-2',
    label: 'Cantine — Août',
    amount: 15000,
    dueDate: '2026-08-10',
    status: 'en-retard',
  },
  {
    id: 'pay-4',
    childId: 'enf-3',
    label: 'Frais de scolarité — Trimestre 2',
    amount: 50000,
    dueDate: '2026-09-15',
    status: 'a-jour',
  },
  {
    id: 'pay-5',
    childId: 'enf-1',
    label: 'Transport scolaire — Août',
    amount: 10000,
    dueDate: '2026-08-05',
    status: 'a-jour',
  },
  {
    id: 'pay-6',
    childId: 'enf-3',
    label: 'Cantine — Août',
    amount: 12000,
    dueDate: '2026-08-10',
    status: 'a-jour',
  },
]

export const paymentStatusLabels = {
  'a-jour': 'À jour',
  'en-attente': 'En attente',
  'en-retard': 'En retard',
}
