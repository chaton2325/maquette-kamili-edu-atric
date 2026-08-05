// Toutes les données sont simulées (maquette). Elles servent à illustrer
// un centre national de supervision : Cameroun, 10 régions, 3 ministères.

export const ministryList = [
  { id: 'MINEDUB', short: 'EDUB', label: 'Éducation de Base', subtitle: 'Maternelle & Primaire', icon: '🎒' },
  { id: 'MINESEC', short: 'SEC', label: 'Enseignement Secondaire', subtitle: 'Collège & Lycée', icon: '🏫' },
  { id: 'MINESUP', short: 'SUP', label: 'Enseignement Supérieur', subtitle: 'Universités & Grandes Écoles', icon: '🎓' },
]

// Posiques (grille stylisée) des 10 régions pour la cartographie choroplèthe.
export const regions = [
  { id: 'adamaoua', name: 'Adamaoua', abbr: 'AD', x: 47, y: 20 },
  { id: 'centre', name: 'Centre', abbr: 'CE', x: 47, y: 40 },
  { id: 'est', name: 'Est', abbr: 'ES', x: 69, y: 40 },
  { id: 'extreme-nord', name: 'Extrême-Nord', abbr: 'EN', x: 25, y: 2 },
  { id: 'littoral', name: 'Littoral', abbr: 'LT', x: 25, y: 60 },
  { id: 'nord', name: 'Nord', abbr: 'NO', x: 25, y: 20 },
  { id: 'nord-ouest', name: 'Nord-Ouest', abbr: 'NW', x: 3, y: 40 },
  { id: 'ouest', name: 'Ouest', abbr: 'OU', x: 25, y: 40 },
  { id: 'sud', name: 'Sud', abbr: 'SU', x: 47, y: 78 },
  { id: 'sud-ouest', name: 'Sud-Ouest', abbr: 'SW', x: 3, y: 60 },
]

// Données régionales par ministère.
// Effectifs, établissements, taux de réussite, taux de présence, filles (%).
const byRegion = {
  MINEDUB: [
    { regionId: 'centre', students: 620000, schools: 3950, successRate: 81, attendanceRate: 92, girlsRate: 48 },
    { regionId: 'littoral', students: 545000, schools: 3320, successRate: 80, attendanceRate: 91, girlsRate: 49 },
    { regionId: 'ouest', students: 420000, schools: 2710, successRate: 82, attendanceRate: 93, girlsRate: 49 },
    { regionId: 'nord', students: 335000, schools: 2210, successRate: 74, attendanceRate: 89, girlsRate: 46 },
    { regionId: 'extreme-nord', students: 365000, schools: 2480, successRate: 69, attendanceRate: 86, girlsRate: 44 },
    { regionId: 'adamaoua', students: 205000, schools: 1330, successRate: 75, attendanceRate: 90, girlsRate: 46 },
    { regionId: 'nord-ouest', students: 240000, schools: 1560, successRate: 73, attendanceRate: 84, girlsRate: 47 },
    { regionId: 'sud-ouest', students: 215000, schools: 1420, successRate: 72, attendanceRate: 83, girlsRate: 47 },
    { regionId: 'est', students: 120000, schools: 830, successRate: 76, attendanceRate: 88, girlsRate: 46 },
    { regionId: 'sud', students: 135000, schools: 920, successRate: 78, attendanceRate: 90, girlsRate: 47 },
  ],
  MINESEC: [
    { regionId: 'centre', students: 385000, schools: 1380, successRate: 76, attendanceRate: 90, girlsRate: 51 },
    { regionId: 'littoral', students: 345000, schools: 1220, successRate: 75, attendanceRate: 89, girlsRate: 52 },
    { regionId: 'ouest', students: 245000, schools: 910, successRate: 77, attendanceRate: 91, girlsRate: 51 },
    { regionId: 'nord', students: 172000, schools: 680, successRate: 68, attendanceRate: 86, girlsRate: 48 },
    { regionId: 'extreme-nord', students: 188000, schools: 750, successRate: 63, attendanceRate: 83, girlsRate: 46 },
    { regionId: 'adamaoua', students: 98000, schools: 390, successRate: 70, attendanceRate: 87, girlsRate: 48 },
    { regionId: 'nord-ouest', students: 132000, schools: 520, successRate: 69, attendanceRate: 80, girlsRate: 50 },
    { regionId: 'sud-ouest', students: 118000, schools: 470, successRate: 68, attendanceRate: 79, girlsRate: 50 },
    { regionId: 'est', students: 62000, schools: 260, successRate: 71, attendanceRate: 85, girlsRate: 48 },
    { regionId: 'sud', students: 70000, schools: 290, successRate: 74, attendanceRate: 87, girlsRate: 50 },
  ],
  MINESUP: [
    { regionId: 'centre', students: 156000, schools: 82, successRate: 78, attendanceRate: 87, girlsRate: 46 },
    { regionId: 'littoral', students: 132000, schools: 71, successRate: 77, attendanceRate: 86, girlsRate: 47 },
    { regionId: 'ouest', students: 38000, schools: 21, successRate: 76, attendanceRate: 85, girlsRate: 46 },
    { regionId: 'nord', students: 18000, schools: 12, successRate: 72, attendanceRate: 82, girlsRate: 43 },
    { regionId: 'extreme-nord', students: 14000, schools: 9, successRate: 70, attendanceRate: 80, girlsRate: 42 },
    { regionId: 'adamaoua', students: 16000, schools: 10, successRate: 73, attendanceRate: 83, girlsRate: 44 },
    { regionId: 'nord-ouest', students: 21000, schools: 14, successRate: 74, attendanceRate: 81, girlsRate: 46 },
    { regionId: 'sud-ouest', students: 19000, schools: 13, successRate: 73, attendanceRate: 79, girlsRate: 45 },
    { regionId: 'est', students: 9000, schools: 6, successRate: 71, attendanceRate: 82, girlsRate: 43 },
    { regionId: 'sud', students: 12000, schools: 8, successRate: 75, attendanceRate: 84, girlsRate: 45 },
  ],
}

// Répartition par niveau (effectifs, en milliers) par ministère.
const levelsByMinistry = {
  MINEDUB: [
    { key: 'maternelle', label: 'Maternelle', icon: '🧸', value: 720000 },
    { key: 'primaire', label: 'Primaire', icon: '📚', value: 2480000 },
  ],
  MINESEC: [
    { key: 'college', label: 'Collège (6e–3e)', icon: '🎒', value: 1200000 },
    { key: 'lycee', label: 'Lycée (2nde–Tle)', icon: '🏫', value: 650000 },
  ],
  MINESUP: [
    { key: 'licence', label: 'Licence', icon: '📘', value: 298000 },
    { key: 'master', label: 'Master', icon: '📙', value: 96000 },
    { key: 'doctorat', label: 'Doctorat', icon: '📗', value: 16000 },
  ],
}

// Tendance annuelle des effectifs (millions) par ministère.
const trendByMinistry = {
  MINEDUB: [
    { label: '2021', value: 3.02 }, { label: '2022', value: 3.11 }, { label: '2023', value: 3.18 }, { label: '2024', value: 3.24 }, { label: '2025', value: 3.2 }, { label: '2026', value: 3.2 },
  ],
  MINESEC: [
    { label: '2021', value: 1.62 }, { label: '2022', value: 1.71 }, { label: '2023', value: 1.78 }, { label: '2024', value: 1.84 }, { label: '2025', value: 1.85 }, { label: '2026', value: 1.85 },
  ],
  MINESUP: [
    { label: '2021', value: 0.33 }, { label: '2022', value: 0.36 }, { label: '2023', value: 0.38 }, { label: '2024', value: 0.41 }, { label: '2025', value: 0.42 }, { label: '2026', value: 0.42 },
  ],
}

export const ministry = {
  MINEDUB: {
    id: 'MINEDUB',
    label: 'Éducation de Base',
    subtitle: 'Maternelle & Primaire',
    icon: '🎒',
    kpis: { students: 3200000, schools: 21730, teachers: 104000, successRate: 77, attendanceRate: 90, girlsRate: 47 },
    byRegion: byRegion.MINEDUB,
    levels: levelsByMinistry.MINEDUB,
    trend: trendByMinistry.MINEDUB,
  },
  MINESEC: {
    id: 'MINESEC',
    label: 'Enseignement Secondaire',
    subtitle: 'Collège & Lycée',
    icon: '🏫',
    kpis: { students: 1850000, schools: 6830, teachers: 62000, successRate: 71, attendanceRate: 86, girlsRate: 50 },
    byRegion: byRegion.MINESEC,
    levels: levelsByMinistry.MINESEC,
    trend: trendByMinistry.MINESEC,
  },
  MINESUP: {
    id: 'MINESUP',
    label: 'Enseignement Supérieur',
    subtitle: 'Universités & Grandes Écoles',
    icon: '🎓',
    kpis: { students: 435000, schools: 246, teachers: 11800, successRate: 76, attendanceRate: 84, girlsRate: 46 },
    byRegion: byRegion.MINESUP,
    levels: levelsByMinistry.MINESUP,
    trend: trendByMinistry.MINESUP,
  },
}

export const years = ['2024-2025', '2025-2026']

// Disparités régionales : écarts par rapport à la moyenne nationale (indice).
// Plus la valeur s'éloigne de 100 parts haut, plus la disparité est marquée.
export function computeDisparities(view) {
  const data = ministry[view].byRegion
  const avgStudents =
    data.reduce((sum, item) => sum + item.students, 0) / data.length
  const avgSuccess =
    data.reduce((sum, item) => sum + item.successRate, 0) / data.length
  const avgGirls =
    data.reduce((sum, item) => sum + item.girlsRate, 0) / data.length

  return data.map((item) => {
    const region = regions.find((r) => r.id === item.regionId)
    const studentsIndex = Math.round((item.students / avgStudents) * 100)
    const successGap = Math.round((item.successRate - avgSuccess) * 10) / 10
    const girlsGap = Math.round((item.girlsRate - avgGirls) * 10) / 10
    return {
      regionId: item.regionId,
      name: region.name,
      abbr: region.abbr,
      studentsIndex,
      successGap,
      girlsGap,
      students: item.students,
      successRate: item.successRate,
      girlsRate: item.girlsRate,
      attendanceRate: item.attendanceRate,
    }
  })
}

// Métriques cartographiables (pour la choroplèthe).
export const mapMetrics = {
  students: { key: 'students', label: 'Effectifs' },
  successRate: { key: 'successRate', label: 'Taux de réussite' },
  attendanceRate: { key: 'attendanceRate', label: 'Taux de présence' },
}

export const alerts = [
  { id: 'al-1', severity: 'critique', origin: 'MINESEC', icon: '📉', title: 'Baisse des effectifs — Nord-Ouest', detail: 'Effectifs en baisse de 6 % sur un an dans les zones anglophones (crise sécuritaire).', date: '2026-08-05' },
  { id: 'al-2', severity: 'critique', origin: 'MINEDUB', icon: '🚨', title: 'Scolarisation des filles — Extrême-Nord', detail: 'Écart fille/garçon de 8 points : taux de scolarisation féminine le plus faible du pays.', date: '2026-08-04' },
  { id: 'al-3', severity: 'importante', origin: 'MINESUP', icon: '🏗️', title: 'Surcharge — Université du Centre', detail: 'Ratio étudiant/enseignant de 48:1, supérieur à la norme nationale (25:1).', date: '2026-08-03' },
  { id: 'al-4', severity: 'importante', origin: 'MINESEC', icon: '📚', title: 'Décrochage en classe de seconde', detail: 'Taux de redoublement de 18 % en seconde sur les deux derniers cycles.', date: '2026-08-02' },
  { id: 'al-5', severity: 'information', origin: 'MINEDUB', icon: '📝', title: 'Campagne d’inscription 2026-2027', detail: 'Ouverture officielle des inscriptions dans les établissements du primaire.', date: '2026-08-01' },
  { id: 'al-6', severity: 'information', origin: 'MINESUP', icon: '🎓', title: 'Résultats des concours', detail: 'Publication des résultats des concours d’entrée aux grandes écoles.', date: '2026-07-30' },
]

export const alertSeverityLabels = {
  critique: 'Critique',
  importante: 'Importante',
  information: 'Information',
}

export const alertOriginIcons = {
  MINEDUB: '🎒',
  MINESEC: '🏫',
  MINESUP: '🎓',
}