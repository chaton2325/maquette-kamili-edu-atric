// Repertoire national (maquette) : vise a illustrer la vue globale des
// ministeres sur l'ensemble des etablissements, leurs enseignants et les
// resultats par eleve. Toutes les donnees sont simulees.

import { regions } from './ministry.js'

export const kindLabels = {
  ecole: 'École primaire / maternelle',
  lycee: 'Collège / Lycée',
  universite: 'Université',
  'grande-ecole': 'Grande école / Institut',
  institut: 'Institut / École privée',
}

export const kindIcons = {
  ecole: '🏫',
  lycee: '🏤',
  universite: '🎓',
  'grande-ecole': '🏛️',
  institut: '🏢',
}

export const ministryLabels = {
  MINEDUB: 'Éducation de Base',
  MINESEC: 'Enseignement Secondaire',
  MINESUP: 'Enseignement Supérieur',
}

export const establishmentStatusLabels = {
  actif: 'Actif',
  surveillance: 'Sous surveillance',
}

export const establishments = [
  { id: 'e-1', name: 'École Publique de Nkolbisson', acronym: 'EP N' , ministry: 'MINEDUB', kind: 'ecole', regionId: 'centre', city: 'Yaoundé', founded: 1972, students: 1240, teachers: 38, successRate: 84, status: 'actif', contact: 'ep.nkolbisson@minedub.cm' },
  { id: 'e-2', name: 'École Publique de Bonamoussadi', acronym: 'EP B', ministry: 'MINEDUB', kind: 'ecole', regionId: 'littoral', city: 'Douala', founded: 1985, students: 1520, teachers: 44, successRate: 85, status: 'actif', contact: 'ep.bonamoussadi@minedub.cm' },
  { id: 'e-3', name: 'École Bilingue La Réussite', acronym: 'EBLR', ministry: 'MINEDUB', kind: 'ecole', regionId: 'centre', city: 'Yaoundé', founded: 2001, students: 680, teachers: 24, successRate: 91, status: 'actif', contact: 'contact@ecolereussite.cm' },
  { id: 'e-4', name: 'École Maternelle Les Bourgeons', acronym: 'EMB', ministry: 'MINEDUB', kind: 'ecole', regionId: 'centre', city: 'Yaoundé', founded: 2010, students: 320, teachers: 14, successRate: 95, status: 'actif', contact: 'lesbourgeons@edugoo.cm' },
  { id: 'e-5', name: 'École Publique de Maroua I', acronym: 'EPM1', ministry: 'MINEDUB', kind: 'ecole', regionId: 'extreme-nord', city: 'Maroua', founded: 1978, students: 1050, teachers: 31, successRate: 72, status: 'surveillance', contact: 'ep.maroua1@minedub.cm' },
  { id: 'e-6', name: 'École Publique de Foumbot', acronym: 'EPF', ministry: 'MINEDUB', kind: 'ecole', regionId: 'ouest', city: 'Foumbot', founded: 1969, students: 890, teachers: 27, successRate: 79, status: 'actif', contact: 'ep.foumbot@minedub.cm' },
  { id: 'e-7', name: 'Lycée Général Leclerc', acronym: 'LGL', ministry: 'MINESEC', kind: 'lycee', regionId: 'centre', city: 'Yaoundé', founded: 1952, students: 2650, teachers: 98, successRate: 88, status: 'actif', contact: 'lg.leclerc@minesec.cm' },
  { id: 'e-8', name: 'Lycée Bilingue de Yaoundé', acronym: 'LBY', ministry: 'MINESEC', kind: 'lycee', regionId: 'centre', city: 'Yaoundé', founded: 1966, students: 3120, teachers: 106, successRate: 90, status: 'actif', contact: 'lby@minesec.cm' },
  { id: 'e-9', name: 'Collège Vogt', acronym: 'CV', ministry: 'MINESEC', kind: 'lycee', regionId: 'centre', city: 'Yaoundé', founded: 1954, students: 940, teachers: 46, successRate: 93, status: 'actif', contact: 'college.vogt@catholique.cm' },
  { id: 'e-10', name: 'Lycée Joss', acronym: 'LJ', ministry: 'MINESEC', kind: 'lycee', regionId: 'littoral', city: 'Douala', founded: 1962, students: 2420, teachers: 90, successRate: 87, status: 'actif', contact: 'lyceejoss@minesec.cm' },
  { id: 'e-11', name: 'Collège Notre-Dame', acronym: 'CND', ministry: 'MINESEC', kind: 'lycee', regionId: 'littoral', city: 'Douala', founded: 1990, students: 780, teachers: 36, successRate: 92, status: 'actif', contact: 'cnd.douala@catholique.cm' },
  { id: 'e-12', name: 'Lycée Bilingue de Dschang', acronym: 'LBD', ministry: 'MINESEC', kind: 'lycee', regionId: 'ouest', city: 'Dschang', founded: 1975, students: 1810, teachers: 74, successRate: 85, status: 'actif', contact: 'lb.dschang@minesec.cm' },
  { id: 'e-13', name: 'Lycée de Maroua', acronym: 'LM', ministry: 'MINESEC', kind: 'lycee', regionId: 'extreme-nord', city: 'Maroua', founded: 1980, students: 2130, teachers: 80, successRate: 76, status: 'surveillance', contact: 'lycee.maroua@minesec.cm' },
  { id: 'e-14', name: 'Lycée Bilingue de Limbé', acronym: 'LBL', ministry: 'MINESEC', kind: 'lycee', regionId: 'sud-ouest', city: 'Limbé', founded: 1988, students: 1640, teachers: 66, successRate: 83, status: 'actif', contact: 'lb.limbe@minesec.cm' },
  { id: 'e-15', name: 'Université de Yaoundé I', acronym: 'UYI', ministry: 'MINESUP', kind: 'universite', regionId: 'centre', city: 'Yaoundé', founded: 1962, students: 72000, teachers: 2430, successRate: 82, status: 'actif', contact: 'contact@uy1.cm' },
  { id: 'e-16', name: 'Université de Yaoundé II — Soa', acronym: 'UYII', ministry: 'MINESUP', kind: 'universite', regionId: 'centre', city: 'Soa', founded: 1993, students: 64000, teachers: 1960, successRate: 84, status: 'actif', contact: 'contact@uy2.cm' },
  { id: 'e-17', name: 'Université de Douala', acronym: 'UD', ministry: 'MINESUP', kind: 'universite', regionId: 'littoral', city: 'Douala', founded: 1977, students: 58000, teachers: 2140, successRate: 85, status: 'actif', contact: 'contact@ud.cm' },
  { id: 'e-18', name: 'Université de Dschang', acronym: 'UdS', ministry: 'MINESUP', kind: 'universite', regionId: 'ouest', city: 'Dschang', founded: 1993, students: 46000, teachers: 1520, successRate: 83, status: 'actif', contact: 'contact@univ-dschang.cm' },
  { id: 'e-19', name: 'Université de Buea', acronym: 'UB', ministry: 'MINESUP', kind: 'universite', regionId: 'sud-ouest', city: 'Buea', founded: 1993, students: 39000, teachers: 1240, successRate: 88, status: 'actif', contact: 'info@ubuea.cm' },
  { id: 'e-20', name: 'Université de Bamenda', acronym: 'UBa', ministry: 'MINESUP', kind: 'universite', regionId: 'nord-ouest', city: 'Bambili', founded: 2011, students: 28000, teachers: 920, successRate: 86, status: 'actif', contact: 'vc@unibamenda.cm' },
  { id: 'e-21', name: 'Université de Maroua', acronym: 'UMa', ministry: 'MINESUP', kind: 'universite', regionId: 'extreme-nord', city: 'Maroua', founded: 2008, students: 22000, teachers: 720, successRate: 80, status: 'surveillance', contact: 'contact@univ-maroua.cm' },
  { id: 'e-22', name: 'Université de Ngaoundéré', acronym: 'UN', ministry: 'MINESUP', kind: 'universite', regionId: 'adamaoua', city: 'Ngaoundéré', founded: 1993, students: 25000, teachers: 810, successRate: 81, status: 'actif', contact: 'contact@univ-ndere.cm' },
  { id: 'e-23', name: 'École Normale Supérieure de Yaoundé', acronym: 'ENS', ministry: 'MINESUP', kind: 'grande-ecole', regionId: 'centre', city: 'Yaoundé', founded: 1961, students: 18000, teachers: 940, successRate: 90, status: 'actif', contact: 'ens@uy1.cm' },
  { id: 'e-24', name: 'ENAM de Yaoundé', acronym: 'ENAM', ministry: 'MINESUP', kind: 'grande-ecole', regionId: 'centre', city: 'Yaoundé', founded: 1959, students: 6200, teachers: 340, successRate: 92, status: 'actif', contact: 'enam@enam.cm' },
  { id: 'e-25', name: 'Université Catholique d’Afrique Centrale', acronym: 'UCAC', ministry: 'MINESUP', kind: 'institut', regionId: 'centre', city: 'Yaoundé', founded: 1989, students: 7600, teachers: 310, successRate: 91, status: 'actif', contact: 'contact@ucac-icam.cm' },
]

export function regionName(regionId) {
  return regions.find((r) => r.id === regionId)?.name ?? regionId
}

export function establishmentById(id) {
  return establishments.find((e) => e.id === id)
}

export const teacherGradeLabels = {
  'instituteur': 'Instituteur',
  'instituteur-principal': 'Instituteur principal',
  'cept': 'CEP',
  'pleg': 'PLEG',
  'cipl': 'CIPL / PLP',
  'ciplinaire': 'CIPL',
  'maitre-assistant': 'Maître-assistant',
  'charge-cours': 'Chargé de cours',
  'maitre-conferences': 'Maître de conférences',
  'professeur': 'Professeur',
}

export const teachers = [
  { id: 'tf-1', name: 'Salomé Epee', establishmentId: 'e-1', discipline: 'Enseignement primaire', grade: 'instituteur-principal', type: 'permanent', status: 'present', load: 38 },
  { id: 'tf-2', name: 'André Ngangue', establishmentId: 'e-2', discipline: 'Mathématiques', grade: 'instituteur', type: 'permanent', status: 'present', load: 40 },
  { id: 'tf-3', name: 'Claire Mbarga', establishmentId: 'e-3', discipline: 'Langue française', grade: 'instituteur', type: 'contractuel', status: 'present', load: 24 },
  { id: 'tf-4', name: 'Paul Mbassi', establishmentId: 'e-1', discipline: 'Sciences', grade: 'instituteur', type: 'permanent', status: 'absent', load: 38 },
  { id: 'tf-5', name: 'Mireille Fouda', establishmentId: 'e-5', discipline: 'Enseignement primaire', grade: 'instituteur-principal', type: 'permanent', status: 'present', load: 31 },
  { id: 'tf-6', name: 'Roger Tchounda', establishmentId: 'e-6', discipline: 'Français', grade: 'instituteur', type: 'contractuel', status: 'present', load: 27 },
  { id: 'ts-1', name: 'Paul Fotso', establishmentId: 'e-7', discipline: 'Mathématiques', grade: 'pleg', type: 'permanent', status: 'present', load: 98 },
  { id: 'ts-2', name: 'Marie Njoya', establishmentId: 'e-8', discipline: 'Physique-Chimie', grade: 'ciplinaire', type: 'permanent', status: 'present', load: 106 },
  { id: 'ts-3', name: 'Jeanne Belinga', establishmentId: 'e-9', discipline: 'Français', grade: 'pleg', type: 'contractuel', status: 'present', load: 46 },
  { id: 'ts-4', name: 'Claude Ndzana', establishmentId: 'e-10', discipline: 'SVT', grade: 'pleg', type: 'permanent', status: 'absent', load: 90 },
  { id: 'ts-5', name: 'Étienne Tabi', establishmentId: 'e-11', discipline: 'Anglais', grade: 'ciplinaire', type: 'permanent', status: 'present', load: 36 },
  { id: 'ts-6', name: 'Hélène Ela', establishmentId: 'e-12', discipline: 'Philosophie', grade: 'pleg', type: 'contractuel', status: 'retard', load: 74 },
  { id: 'ts-7', name: 'André Mbarga', establishmentId: 'e-13', discipline: 'Histoire-Géo', grade: 'pleg', type: 'permanent', status: 'present', load: 80 },
  { id: 'ts-8', name: 'Solange Tchoumi', establishmentId: 'e-14', discipline: 'Mathématiques', grade: 'ciplinaire', type: 'contractuel', status: 'present', load: 66 },
  { id: 'tu-1', name: 'Charles Ngo Bassa', establishmentId: 'e-15', discipline: 'Mathématiques', grade: 'professeur', type: 'permanent', status: 'present', load: 8 },
  { id: 'tu-2', name: 'Odile Essomba', establishmentId: 'e-15', discipline: 'Médecine', grade: 'maitre-conferences', type: 'permanent', status: 'present', load: 12 },
  { id: 'tu-3', name: 'Jean-Paul Kenfack', establishmentId: 'e-16', discipline: 'Droit', grade: 'professeur', type: 'permanent', status: 'present', load: 10 },
  { id: 'tu-4', name: 'Rosine Mballa', establishmentId: 'e-17', discipline: 'Économie', grade: 'maitre-conferences', type: 'permanent', status: 'present', load: 9 },
  { id: 'tu-5', name: 'Éric Tchinda', establishmentId: 'e-18', discipline: 'Agronomie', grade: 'maitre-conferences', type: 'permanent', status: 'absent', load: 7 },
  { id: 'tu-6', name: 'Veronique Awah', establishmentId: 'e-19', discipline: 'Sciences de la santé', grade: 'maitre-conferences', type: 'permanent', status: 'present', load: 11 },
  { id: 'tu-7', name: 'Michel Fru', establishmentId: 'e-20', discipline: 'Sciences de l’éducation', grade: 'charge-cours', type: 'contractuel', status: 'present', load: 6 },
  { id: 'tu-8', name: 'Fatima Abakar', establishmentId: 'e-21', discipline: 'Mines & pétrole', grade: 'maitre-assistant', type: 'permanent', status: 'present', load: 5 },
  { id: 'tu-9', name: 'Bernard Nomo', establishmentId: 'e-22', discipline: 'Sciences', grade: 'maitre-conferences', type: 'permanent', status: 'present', load: 8 },
  { id: 'tu-10', name: 'Lucette Bele', establishmentId: 'e-23', discipline: 'Sciences de l’éducation', grade: 'maitre-conferences', type: 'permanent', status: 'present', load: 9 },
  { id: 'tu-11', name: 'Emmanuel Sighoko', establishmentId: 'e-24', discipline: 'Droit public', grade: 'professeur', type: 'permanent', status: 'present', load: 6 },
  { id: 'tu-12', name: 'Brigitte Nana', establishmentId: 'e-25', discipline: 'Sciences de gestion', grade: 'maitre-assistant', type: 'contractuel', status: 'present', load: 7 },
]

export const mentionOrder = ['Très bien', 'Bien', 'Assez bien', 'Passable', 'Insuffisant']
export const mentionBadge = {
  'Très bien': 'success',
  'Bien': 'success',
  'Assez bien': 'info',
  'Passable': 'warning',
  'Insuffisant': 'danger',
}

export const results = [
  { id: 'r-1', name: 'Amina Koné', establishmentId: 'e-3', level: 'CM2', average: 17.2, mention: 'Bien', rank: 1 },
  { id: 'r-2', name: 'Junior Mbarga', establishmentId: 'e-7', level: 'Terminale D', average: 16.8, mention: 'Bien', rank: 2 },
  { id: 'r-3', name: 'Sarah Meka', establishmentId: 'e-10', level: '5e', average: 15.4, mention: 'Assez bien', rank: 4 },
  { id: 'r-4', name: 'Chantal Talla', establishmentId: 'e-8', level: 'Seconde', average: 16.2, mention: 'Bien', rank: 1 },
  { id: 'r-5', name: 'Paul Owona', establishmentId: 'e-9', level: 'Première D', average: 15.9, mention: 'Bien', rank: 3 },
  { id: 'r-6', name: 'Yannick Ndoua', establishmentId: 'e-7', level: '3e', average: 13.1, mention: 'Passable', rank: 18 },
  { id: 'r-7', name: 'Grace Ntep', establishmentId: 'e-8', level: 'Terminale D', average: 18.4, mention: 'Très bien', rank: 1 },
  { id: 'r-8', name: 'Roméo Fouda', establishmentId: 'e-10', level: '6e', average: 11.9, mention: 'Passable', rank: 24 },
  { id: 'r-9', name: 'Fatou Malgari', establishmentId: 'e-5', level: 'CM2', average: 10.2, mention: 'Insuffisant', rank: 31 },
  { id: 'r-10', name: 'Dieudonné Kana', establishmentId: 'e-13', level: 'Terminale A', average: 12.6, mention: 'Passable', rank: 15 },
  { id: 'r-11', name: 'Clarisse Abena', establishmentId: 'e-14', level: '3e', average: 14.8, mention: 'Assez bien', rank: 6 },
  { id: 'r-12', name: 'Serge Manfoumbi', establishmentId: 'e-12', level: 'Seconde C', average: 15.1, mention: 'Assez bien', rank: 5 },
  { id: 'r-13', name: 'Laetitia Ewane', establishmentId: 'e-2', level: 'CE2', average: 16.0, mention: 'Bien', rank: 2 },
  { id: 'r-14', name: 'Boris Njoya', establishmentId: 'e-6', level: 'CM1', average: 13.4, mention: 'Passable', rank: 14 },
  { id: 'r-15', name: 'Viviane Éboué', establishmentId: 'e-15', level: 'Master 2', average: 14.9, mention: 'Assez bien', rank: 5 },
  { id: 'r-16', name: 'Franck Alima', establishmentId: 'e-16', level: 'Licence 3', average: 15.8, mention: 'Bien', rank: 3 },
  { id: 'r-17', name: 'Diane Fofack', establishmentId: 'e-17', level: 'Licence 3', average: 13.7, mention: 'Passable', rank: 12 },
  { id: 'r-18', name: 'Hippolyte Njukeng', establishmentId: 'e-18', level: 'Master 1', average: 16.4, mention: 'Bien', rank: 2 },
  { id: 'r-19', name: 'Nadine Tchoua', establishmentId: 'e-19', level: 'Licence 2', average: 17.1, mention: 'Très bien', rank: 1 },
  { id: 'r-20', name: 'Oscar Wamba', establishmentId: 'e-20', level: 'Licence 1', average: 12.9, mention: 'Passable', rank: 22 },
  { id: 'r-21', name: 'Halima Bouba', establishmentId: 'e-21', level: 'Licence 3', average: 15.0, mention: 'Assez bien', rank: 7 },
  { id: 'r-22', name: 'Rémi Mbafor', establishmentId: 'e-22', level: 'Master 2', average: 14.2, mention: 'Passable', rank: 9 },
  { id: 'r-23', name: 'Wilfried Talla', establishmentId: 'e-23', level: 'Licence 2', average: 16.9, mention: 'Très bien', rank: 1 },
  { id: 'r-24', name: 'Henriette Kamga', establishmentId: 'e-24', level: 'Cycle magistrature', average: 17.6, mention: 'Très bien', rank: 1 },
  { id: 'r-25', name: 'Aristide Owona', establishmentId: 'e-25', level: 'Licence 3', average: 14.6, mention: 'Assez bien', rank: 4 },
]

// Facultes / filieres des etablissements de l'enseignement superieur.
export const faculties = [
  { id: 'f-1', establishmentId: 'e-15', name: 'Faculté des Arts, Lettres et Sciences Humaines', students: 21000 },
  { id: 'f-2', establishmentId: 'e-15', name: 'Faculté de Médecine et Sciences Biomédicales', students: 9600 },
  { id: 'f-3', establishmentId: 'e-15', name: 'Faculté des Sciences', students: 24000 },
  { id: 'f-4', establishmentId: 'e-15', name: 'Faculté des Sciences Économiques et de Gestion', students: 17400 },
  { id: 'f-5', establishmentId: 'e-16', name: 'Faculté des Sciences Juridiques et Politiques', students: 30000 },
  { id: 'f-6', establishmentId: 'e-16', name: 'Faculté des Sciences Économiques et de Gestion', students: 26000 },
  { id: 'f-7', establishmentId: 'e-16', name: 'Institut Universitaire de Technologie', students: 8000 },
  { id: 'f-8', establishmentId: 'e-17', name: 'Faculté des Sciences', students: 22000 },
  { id: 'f-9', establishmentId: 'e-17', name: 'Faculté des Sciences Économiques et Appliquées', students: 18000 },
  { id: 'f-10', establishmentId: 'e-17', name: 'Faculté de Droit', students: 9500 },
  { id: 'f-11', establishmentId: 'e-18', name: 'Faculté des Sciences', students: 12000 },
  { id: 'f-12', establishmentId: 'e-18', name: 'FASA (Agronomie et Sciences Agricoles)', students: 9800 },
  { id: 'f-13', establishmentId: 'e-18', name: 'Faculté de Droit et Sciences Politiques', students: 11000 },
  { id: 'f-14', establishmentId: 'e-18', name: 'Faculté des Sciences Économiques', students: 13200 },
  { id: 'f-15', establishmentId: 'e-19', name: 'Faculty of Science', students: 14000 },
  { id: 'f-16', establishmentId: 'e-19', name: 'Faculty of Health Sciences', students: 7500 },
  { id: 'f-17', establishmentId: 'e-19', name: 'Faculty of Arts', students: 9000 },
  { id: 'f-18', establishmentId: 'e-19', name: 'Faculty of Social & Management Sciences', students: 8500 },
  { id: 'f-19', establishmentId: 'e-20', name: 'Faculty of Science', students: 9000 },
  { id: 'f-20', establishmentId: 'e-20', name: 'Faculty of Education', students: 6000 },
  { id: 'f-21', establishmentId: 'e-20', name: 'HTTC Bambili', students: 5200 },
  { id: 'f-22', establishmentId: 'e-20', name: 'Faculty of Arts', students: 7800 },
  { id: 'f-23', establishmentId: 'e-21', name: 'Faculté des Arts, Lettres et Sciences Humaines', students: 8000 },
  { id: 'f-24', establishmentId: 'e-21', name: 'Faculté des Sciences', students: 6000 },
  { id: 'f-25', establishmentId: 'e-21', name: 'Faculté des Sciences Économiques', students: 5000 },
  { id: 'f-26', establishmentId: 'e-21', name: 'Faculté des Mines et Industries Pétrolières', students: 3000 },
  { id: 'f-27', establishmentId: 'e-22', name: 'Faculté des Sciences', students: 9000 },
  { id: 'f-28', establishmentId: 'e-22', name: 'FSEG Ngaoundéré', students: 7000 },
  { id: 'f-29', establishmentId: 'e-22', name: 'Faculté de Droit', students: 6000 },
  { id: 'f-30', establishmentId: 'e-22', name: 'ENSPD (École Polytechnique)', students: 3000 },
  { id: 'f-31', establishmentId: 'e-23', name: 'Département des Sciences de l’Éducation', students: 7000 },
  { id: 'f-32', establishmentId: 'e-23', name: 'Département des Langues', students: 5000 },
  { id: 'f-33', establishmentId: 'e-23', name: 'Département de Mathématiques / Physique', students: 3600 },
  { id: 'f-34', establishmentId: 'e-23', name: 'Département de Sciences Biologiques', students: 2400 },
  { id: 'f-35', establishmentId: 'e-24', name: 'Cycle Administration Générale', students: 2500 },
  { id: 'f-36', establishmentId: 'e-24', name: 'Cycle Magistrature', students: 1200 },
  { id: 'f-37', establishmentId: 'e-24', name: 'Cycle Diplomatie', students: 1500 },
  { id: 'f-38', establishmentId: 'e-24', name: 'Cycle Régies Financières', students: 1000 },
  { id: 'f-39', establishmentId: 'e-25', name: 'Faculté de Droit', students: 2400 },
  { id: 'f-40', establishmentId: 'e-25', name: 'Faculté des Sciences Sociales et de Gestion', students: 2900 },
  { id: 'f-41', establishmentId: 'e-25', name: 'Faculté de Théologie', students: 1300 },
  { id: 'f-42', establishmentId: 'e-25', name: 'ESTI (École Supérieure des TIC)', students: 1000 },
]

export function facultiesFor(establishmentId) {
  return faculties.filter((f) => f.establishmentId === establishmentId)
}

export function teachersFor(establishmentId) {
  return teachers.filter((t) => t.establishmentId === establishmentId)
}

export function resultsFor(establishmentId) {
  return results.filter((r) => r.establishmentId === establishmentId)
}