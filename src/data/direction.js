export const directionProfile = {
  firstName: 'Marie',
  lastName: 'Ngo Bassa',
  title: 'Directrice des études',
  school: 'Lycée Bilingue de Yaoundé',
  email: 'direction@lyceebilingue.cm',
  phone: '+237 6 99 00 11 22',
  address: 'Yaoundé, Cameroun',
  avatar: '👩‍🏫',
}

export const schoolStats = {
  students: 1240,
  girls: 584,
  boys: 656,
  teachers: 68,
  classes: 32,
  classrooms: 28,
  newStudents: 214,
  attendanceRate: 94,
  averageGrade: 13.2,
  successRate: 86,
  recoveryRate: 88,
}

export const enrollmentByLevel = [
  { key: 'maternelle', level: 'Maternelle', cycle: 'Primaire', students: 180, boys: 92, girls: 88, icon: '🧸' },
  { key: 'primaire', level: 'Primaire', cycle: 'Primaire', students: 430, boys: 226, girls: 204, icon: '📚' },
  { key: 'college', level: 'Collège', cycle: 'Secondaire', students: 402, boys: 216, girls: 186, icon: '🎒' },
  { key: 'lycee', level: 'Lycée', cycle: 'Secondaire', students: 228, boys: 122, girls: 106, icon: '🎓' },
]

export const enrollmentTrend = [
  { label: 'Sept', value: 1105 },
  { label: 'Oct', value: 1132 },
  { label: 'Nov', value: 1148 },
  { label: 'Déc', value: 1160 },
  { label: 'Janv', value: 1174 },
  { label: 'Févr', value: 1186 },
  { label: 'Mars', value: 1198 },
  { label: 'Avr', value: 1208 },
  { label: 'Mai', value: 1218 },
  { label: 'Juin', value: 1226 },
  { label: 'Juil', value: 1234 },
  { label: 'Août', value: 1240 },
]

export const schoolClasses = [
  { id: 'cls-1', name: 'Terminale D', level: 'Lycée', teacher: 'M. Fotso', students: 42, capacity: 50 },
  { id: 'cls-2', name: 'Première D', level: 'Lycée', teacher: 'Mme Njoya', students: 44, capacity: 50 },
  { id: 'cls-3', name: 'Seconde C', level: 'Lycée', teacher: 'M. Tabi', students: 51, capacity: 55 },
  { id: 'cls-4', name: '3e', level: 'Collège', teacher: 'M. Mbarga', students: 49, capacity: 55 },
  { id: 'cls-5', name: '4e', level: 'Collège', teacher: 'Mme Ndzana', students: 50, capacity: 55 },
  { id: 'cls-6', name: '5e', level: 'Collège', teacher: 'M. Fotso', students: 52, capacity: 55 },
  { id: 'cls-7', name: '6e A', level: 'Collège', teacher: 'M. Tchoumi', students: 48, capacity: 55 },
  { id: 'cls-8', name: 'CM2', level: 'Primaire', teacher: 'Mme Belinga', students: 46, capacity: 50 },
]

export const staff = [
  { id: 't-1', name: 'Paul Fotso', subject: 'Mathématiques', classes: 'Terminale D, Première D, Seconde C', type: 'permanent', status: 'present', avatar: '👨‍🏫' },
  { id: 't-2', name: 'Marie Njoya', subject: 'Physique-Chimie', classes: 'Première D, Terminale D', type: 'permanent', status: 'present', avatar: '👩‍🏫' },
  { id: 't-3', name: 'Jeanne Belinga', subject: 'Français', classes: 'CM2, 5e', type: 'contractuel', status: 'present', avatar: '👩‍🏫' },
  { id: 't-4', name: 'Claude Ndzana', subject: 'SVT', classes: '4e, Terminale D', type: 'permanent', status: 'absent', avatar: '👨‍🏫' },
  { id: 't-5', name: 'Étienne Tabi', subject: 'Anglais', classes: '3e, Seconde C', type: 'permanent', status: 'present', avatar: '👨‍🏫' },
  { id: 't-6', name: 'Hélène Ela', subject: 'Philosophie', classes: 'Terminale D, Première D', type: 'contractuel', status: 'retard', avatar: '👩‍🏫' },
  { id: 't-7', name: 'André Mbarga', subject: 'Histoire-Géographie', classes: '6e A, 6e B', type: 'permanent', status: 'present', avatar: '👨‍🏫' },
  { id: 't-8', name: 'Solange Tchoumi', subject: 'Mathématiques', classes: '4e, 3e', type: 'contractuel', status: 'present', avatar: '👩‍🏫' },
]

export const staffTypeLabels = {
  permanent: 'Permanent',
  contractuel: 'Contractuel',
}

export const attendanceByClass = [
  { label: 'Term D', present: 39, absent: 2, retard: 1 },
  { label: 'Prem D', present: 41, absent: 2, retard: 1 },
  { label: 'Seconde C', present: 48, absent: 2, retard: 1 },
  { label: '3e', present: 45, absent: 3, retard: 1 },
  { label: '4e', present: 47, absent: 2, retard: 1 },
  { label: '5e', present: 49, absent: 2, retard: 1 },
  { label: '6e A', present: 44, absent: 3, retard: 1 },
  { label: 'CM2', present: 44, absent: 1, retard: 1 },
]

export const attendanceTrend = [
  { label: 'Sept', value: 92 },
  { label: 'Oct', value: 93 },
  { label: 'Nov', value: 94 },
  { label: 'Déc', value: 90 },
  { label: 'Janv', value: 95 },
  { label: 'Févr', value: 94 },
  { label: 'Mars', value: 95 },
  { label: 'Avr', value: 93 },
  { label: 'Mai', value: 94 },
  { label: 'Juin', value: 92 },
  { label: 'Juil', value: 95 },
  { label: 'Août', value: 94 },
]

export const resultsByClass = [
  { label: 'Term D', average: 13.8, passRate: 90 },
  { label: 'Prem D', average: 13.2, passRate: 88 },
  { label: 'Seconde C', average: 12.9, passRate: 85 },
  { label: '3e', average: 12.4, passRate: 82 },
  { label: '4e', average: 13.0, passRate: 87 },
  { label: '5e', average: 12.1, passRate: 80 },
  { label: '6e A', average: 13.5, passRate: 89 },
  { label: 'CM2', average: 14.1, passRate: 93 },
]

export const mentionDistribution = [
  { key: 'tb', label: 'Très bien', icon: '🌟', value: 128 },
  { key: 'bien', label: 'Bien', icon: '👍', value: 265 },
  { key: 'ab', label: 'Assez bien', icon: '😊', value: 342 },
  { key: 'passable', label: 'Passable', icon: '🙂', value: 289 },
  { key: 'insuffisant', label: 'Insuffisant', icon: '⚠️', value: 216 },
]

export const topStudents = [
  { id: 's-1', name: 'Grace Ntep', level: 'CM2', average: 18.2, rank: '1re' },
  { id: 's-2', name: 'Junior Mbarga', level: 'Terminale D', average: 17.6, rank: '2e' },
  { id: 's-3', name: 'Sarah Meka', level: '5e', average: 17.1, rank: '3e' },
  { id: 's-4', name: 'Chantal Talla', level: 'Seconde C', average: 16.8, rank: '4e' },
  { id: 's-5', name: 'Paul Owona', level: 'Première D', average: 16.4, rank: '5e' },
]

export const paymentSummary = {
  collected: 18400000,
  pending: 2600000,
  overdue: 1200000,
  recoveryRate: 88,
}

export const payments = [
  { id: 'pay-1', student: 'Amina Koné', level: 'CM2', label: 'Frais de scolarité — Trimestre 2', amount: 75000, dueDate: '2026-09-15', status: 'a-jour' },
  { id: 'pay-2', student: 'Yannick Koné', level: '5e', label: 'Frais de scolarité — Trimestre 2', amount: 65000, dueDate: '2026-08-20', status: 'en-attente' },
  { id: 'pay-3', student: 'Yannick Koné', level: '5e', label: 'Cantine — Août', amount: 15000, dueDate: '2026-08-10', status: 'en-retard' },
  { id: 'pay-4', student: 'Junior Mbarga', level: 'Terminale D', label: 'Frais d’examen blanc', amount: 5000, dueDate: '2026-08-25', status: 'a-jour' },
  { id: 'pay-5', student: 'Grace Ntep', level: 'Terminale D', label: 'Frais de scolarité — Trimestre 2', amount: 70000, dueDate: '2026-09-15', status: 'a-jour' },
  { id: 'pay-6', student: 'Roméo Fouda', level: 'Seconde C', label: 'Assurance scolaire', amount: 8000, dueDate: '2026-09-01', status: 'en-attente' },
  { id: 'pay-7', student: 'Chantal Talla', level: 'Première D', label: 'Frais de scolarité — Trimestre 2', amount: 70000, dueDate: '2026-09-15', status: 'a-jour' },
  { id: 'pay-8', student: 'Sarah Meka', level: '5e', label: 'Cantine — Août', amount: 15000, dueDate: '2026-08-10', status: 'en-retard' },
]

export const paymentStatusLabels = {
  'a-jour': 'À jour',
  'en-attente': 'En attente',
  'en-retard': 'En retard',
}

export const financeMonthly = [
  { label: 'Sept', revenue: 9200000, expenses: 6100000 },
  { label: 'Oct', revenue: 11800000, expenses: 6800000 },
  { label: 'Nov', revenue: 12100000, expenses: 6900000 },
  { label: 'Déc', revenue: 11200000, expenses: 7200000 },
  { label: 'Janv', revenue: 12400000, expenses: 7000000 },
  { label: 'Févr', revenue: 12600000, expenses: 7100000 },
  { label: 'Mars', revenue: 11900000, expenses: 7300000 },
  { label: 'Avr', revenue: 12300000, expenses: 6900000 },
  { label: 'Mai', revenue: 12800000, expenses: 7050000 },
  { label: 'Juin', revenue: 12500000, expenses: 7400000 },
  { label: 'Juil', revenue: 13100000, expenses: 7200000 },
  { label: 'Août', revenue: 12900000, expenses: 7150000 },
]

export const financeSummary = {
  totalRevenue: 144800000,
  totalExpenses: 84100000,
  balance: 60700000,
  annualBudget: 150000000,
  salaryShare: 62,
  operationsShare: 28,
  maintenanceShare: 10,
}

export const financeTransactions = [
  { id: 'ftx-1', label: 'Scolarité — Trimestre 2', category: 'Scolarité', amount: 18400000, type: 'credit', date: '2026-08-04' },
  { id: 'ftx-2', label: 'Salaires du mois', category: 'Salaires', amount: -4200000, type: 'debit', date: '2026-08-03' },
  { id: 'ftx-3', label: 'Cantine — Août', category: 'Cantine', amount: 2950000, type: 'credit', date: '2026-08-02' },
  { id: 'ftx-4', label: 'Maintenance informatique', category: 'Maintenance', amount: -450000, type: 'debit', date: '2026-08-02' },
  { id: 'ftx-5', label: 'Transport scolaire', category: 'Transport', amount: 1380000, type: 'credit', date: '2026-08-01' },
  { id: 'ftx-6', label: 'Fournitures de bureau', category: 'Fonctionnement', amount: -380000, type: 'debit', date: '2026-08-01' },
]

export const alerts = [
  { id: 'al-1', severity: 'critique', icon: '🚨', title: 'Absences répétées — Terminale D', detail: 'Taux d’absentéisme supérieur à 10 % sur les deux dernières semaines.', date: '2026-08-05', status: 'active' },
  { id: 'al-2', severity: 'critique', icon: '💰', title: 'Arriérés de paiement', detail: '12 familles sont en retard sur les frais de scolarité du Trimestre 2.', date: '2026-08-04', status: 'active' },
  { id: 'al-3', severity: 'importante', icon: '👩‍🏫', title: 'Enseignant absent — SVT', detail: 'M. Ndzana absent aujourd’hui : prévoir un remplaçant pour la classe de 4e.', date: '2026-08-05', status: 'active' },
  { id: 'al-4', severity: 'importante', icon: '🏗️', title: 'Salle 12 — Maintenance', detail: 'Fuite signalée dans la salle 12 : intervention prévue vendredi.', date: '2026-08-03', status: 'traite' },
  { id: 'al-5', severity: 'information', icon: '📋', title: 'Conseils de classe', detail: 'Le calendrier des conseils de classe du Trimestre 2 est publié.', date: '2026-08-02', status: 'traite' },
  { id: 'al-6', severity: 'information', icon: '🧰', title: 'Renouvellement du matériel', detail: 'Inventaire du matériel de laboratoire à finaliser avant le 20 août.', date: '2026-08-01', status: 'traite' },
]

export const alertSeverityLabels = {
  critique: 'Critique',
  importante: 'Importante',
  information: 'Information',
}

export const reports = [
  { id: 'rep-1', title: 'Rapport de rentrée 2026-2027', type: 'Effectifs', period: 'Septembre 2026', status: 'genere', date: '2026-08-05' },
  { id: 'rep-2', title: 'Bilan du Trimestre 2', type: 'Résultats', period: 'Trimestre 2', status: 'genere', date: '2026-08-04' },
  { id: 'rep-3', title: 'Situation des paiements', type: 'Finances', period: 'Août 2026', status: 'genere', date: '2026-08-03' },
  { id: 'rep-4', title: 'Assiduité des enseignants', type: 'Présences', period: 'Août 2026', status: 'genere', date: '2026-08-03' },
  { id: 'rep-5', title: 'Suivi des absences élèves', type: 'Présences', period: 'Semaine 32', status: 'en-cours', date: '—' },
  { id: 'rep-6', title: 'Budget prévisionnel 2026-2027', type: 'Finances', period: 'Année scolaire', status: 'en-cours', date: '—' },
]

export const reportTypeLabels = {
  Effectifs: 'Effectifs',
  Résultats: 'Résultats',
  Finances: 'Finances',
  Présences: 'Présences',
}

export const reportStatusLabels = {
  genere: 'Généré',
  'en-cours': 'En cours',
}
