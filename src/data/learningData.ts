export type MovementId =
  | 'berjalan'
  | 'berlari'
  | 'melompat'
  | 'meloncat'
  | 'berjingkat'
  | 'berderap';

export type VisualSceneId =
  | MovementId
  | 'duduk'
  | 'tidur'
  | 'berdiri'
  | 'membaca'
  | 'menulis';

export interface MovementInfo {
  id: MovementId;
  name: string;
  badgeText: string;
  isEnrichment?: boolean;
  shortDesc: string;
  dailyExample: string;
  audioScript: string;
  tip: string;
  accentHex: string;
  surfaceClass: string;
  borderClass: string;
  textClass: string;
}

export const MOVEMENTS: MovementInfo[] = [
  {
    id: 'berjalan',
    name: 'Berjalan',
    badgeText: 'Gerak Utama 1',
    shortDesc: 'Melangkahkan kaki secara bergantian untuk berpindah tempat.',
    dailyExample: 'Berjalan menuju kelas atau sekolah di pagi hari.',
    audioScript:
      'Berjalan. Melangkahkan kaki secara bergantian untuk berpindah tempat. Contohnya, berjalan menuju kelas bersama teman.',
    tip: 'Ayunkan tangan secara alami dan pandangan lurus ke depan.',
    accentHex: '#0284C7',
    surfaceClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    textClass: 'text-sky-800',
  },
  {
    id: 'berlari',
    name: 'Berlari',
    badgeText: 'Gerak Utama 2',
    shortDesc: 'Melangkahkan kaki dengan cepat untuk berpindah tempat.',
    dailyExample: 'Berlari saat bermain kejar-kejaran di halaman.',
    audioScript:
      'Berlari. Melangkahkan kaki dengan cepat untuk berpindah tempat. Contohnya, berlari saat bermain kejar-kejaran.',
    tip: 'Tekuk siku tangan dan melangkahlah dengan ringan.',
    accentHex: '#EA580C',
    surfaceClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    textClass: 'text-orange-800',
  },
  {
    id: 'melompat',
    name: 'Melompat',
    badgeText: 'Gerak Utama 3',
    shortDesc: 'Bertolak menggunakan satu kaki dan mendarat dengan satu atau kedua kaki.',
    dailyExample: 'Melompat melewati garis di lapangan sekolah.',
    audioScript:
      'Melompat. Bertolak menggunakan satu kaki dan mendarat dengan satu atau kedua kaki. Contohnya, melompat melewati garis.',
    tip: 'Tekuk lutut sedikit saat mendarat agar tetap seimbang dan aman.',
    accentHex: '#059669',
    surfaceClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    textClass: 'text-emerald-800',
  },
  {
    id: 'meloncat',
    name: 'Meloncat',
    badgeText: 'Gerak Utama 4',
    shortDesc: 'Bertolak menggunakan kedua kaki dan mendarat menggunakan kedua kaki.',
    dailyExample: 'Meloncat riang seperti kelinci LOKO!',
    audioScript:
      'Meloncat. Bertolak menggunakan kedua kaki dan mendarat menggunakan kedua kaki. Contohnya, meloncat seperti kelinci!',
    tip: 'Tolak lantai dengan kedua kaki bersamaan dan mendarat dengan lutut lentur.',
    accentHex: '#D97706',
    surfaceClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    textClass: 'text-amber-800',
  },
  {
    id: 'berjingkat',
    name: 'Berjingkat',
    badgeText: 'Gerak Utama 5',
    shortDesc: 'Bergerak dengan bertumpu pada ujung kaki.',
    dailyExample: 'Berjingkat pelan seperti penari di atas panggung.',
    audioScript:
      'Berjingkat. Bergerak dengan bertumpu pada ujung kaki. Contohnya, berjingkat anggun seperti penari.',
    tip: 'Angkat tumit perlahan dan jaga keseimbangan tubuh.',
    accentHex: '#0D9488',
    surfaceClass: 'bg-teal-50',
    borderClass: 'border-teal-200',
    textClass: 'text-teal-800',
  },
  {
    id: 'berderap',
    name: 'Berderap',
    badgeText: 'Materi Pengayaan',
    isEnrichment: true,
    shortDesc: 'Melangkah cepat ke depan dengan pola gerakan seperti kuda.',
    dailyExample: 'Berderap riang menirukan gerakan kuda di taman.',
    audioScript:
      'Materi pengayaan: Berderap. Melangkah ke depan dengan pola irama seperti kuda yang berlari kecil.',
    tip: 'Satu kaki selalu di depan dan kaki lainnya mengikuti di belakang.',
    accentHex: '#2563EB',
    surfaceClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    textClass: 'text-blue-800',
  },
];

export const CORE_FIVE_MOVEMENTS = MOVEMENTS.filter((m) => !m.isEnrichment);

export interface PracticeStep {
  id: MovementId;
  stepNumber: number;
  command: string;
  audioInstruction: string;
  durationSeconds: number;
  safetyNote: string;
}

export const PRACTICE_STEPS: PracticeStep[] = [
  {
    id: 'berjalan',
    stepNumber: 1,
    command: 'Ayo berjalan di tempat!',
    audioInstruction:
      'Langkah pertama! Ayo berjalan di tempat! Angkat kakimu bergantian kanan dan kiri, ayunkan tanganmu dengan santai.',
    durationSeconds: 12,
    safetyNote: 'Pastikan lantai rata dan tidak licin.',
  },
  {
    id: 'berlari',
    stepNumber: 2,
    command: 'Ayo berlari kecil di tempat!',
    audioInstruction:
      'Langkah kedua! Ayo berlari kecil di tempat! Gerakkan kaki lebih cepat dengan langkah kecil dan ringan.',
    durationSeconds: 12,
    safetyNote: 'Jaga jarak aman dengan teman di sekitarmu.',
  },
  {
    id: 'melompat',
    stepNumber: 3,
    command: 'Ayo melompat!',
    audioInstruction:
      'Langkah ketiga! Ayo melompat! Bertolaklah menggunakan satu kaki, lalu mendaratlah dengan lutut yang lentur.',
    durationSeconds: 12,
    safetyNote: 'Jangan melompat dari tempat tinggi, lakukan di lantai yang aman.',
  },
  {
    id: 'meloncat',
    stepNumber: 4,
    command: 'Ayo meloncat seperti kelinci!',
    audioInstruction:
      'Langkah keempat! Ayo meloncat seperti kelinci! Tolak dengan kedua kaki bersama-sama, lalu mendarat dengan kedua kaki!',
    durationSeconds: 12,
    safetyNote: 'Mendarat dengan kedua ujung kaki terlebih dahulu agar lembut.',
  },
  {
    id: 'berjingkat',
    stepNumber: 5,
    command: 'Ayo berjingkat!',
    audioInstruction:
      'Langkah kelima! Ayo berjingkat! Berjalanlah pelan dengan bertumpu pada ujung kakimu seperti penari!',
    durationSeconds: 12,
    safetyNote: 'Rentangkan tangan sedikit bila perlu untuk menjaga keseimbangan.',
  },
];

export interface GuessQuestion {
  id: number;
  movement: MovementId;
  prompt: string;
  options: { label: string; value: MovementId }[];
  correctAnswer: MovementId;
  hint: string;
}

export const GAME1_QUESTIONS: GuessQuestion[] = [
  {
    id: 1,
    movement: 'berlari',
    prompt: 'Gerakan apakah ini?',
    options: [
      { label: 'Berjalan', value: 'berjalan' },
      { label: 'Berlari', value: 'berlari' },
      { label: 'Melompat', value: 'melompat' },
    ],
    correctAnswer: 'berlari',
    hint: 'Perhatikan langkah kakinya bergerak dengan cepat!',
  },
  {
    id: 2,
    movement: 'meloncat',
    prompt: 'Kelinci dan anak ini bertolak memakai dua kaki. Gerakan apakah ini?',
    options: [
      { label: 'Berjalan', value: 'berjalan' },
      { label: 'Berjingkat', value: 'berjingkat' },
      { label: 'Meloncat', value: 'meloncat' },
    ],
    correctAnswer: 'meloncat',
    hint: 'Kedua kaki menolak dan mendarat bersama-sama seperti kelinci.',
  },
  {
    id: 3,
    movement: 'berjalan',
    prompt: 'Anak ini melangkahkan kaki bergantian dengan santai. Gerakan apakah ini?',
    options: [
      { label: 'Berjalan', value: 'berjalan' },
      { label: 'Meloncat', value: 'meloncat' },
      { label: 'Berlari', value: 'berlari' },
    ],
    correctAnswer: 'berjalan',
    hint: 'Langkahnya tenang dan kaki melangkah bergantian.',
  },
  {
    id: 4,
    movement: 'melompat',
    prompt: 'Anak ini bertolak dengan satu kaki melewati garis. Gerakan apakah ini?',
    options: [
      { label: 'Berjingkat', value: 'berjingkat' },
      { label: 'Melompat', value: 'melompat' },
      { label: 'Berjalan', value: 'berjalan' },
    ],
    correctAnswer: 'melompat',
    hint: 'Tolakan dimulai dari satu kaki untuk melewati garis.',
  },
  {
    id: 5,
    movement: 'berjingkat',
    prompt: 'Anak ini bertumpu di atas ujung kaki seperti penari. Gerakan apakah ini?',
    options: [
      { label: 'Berjingkat', value: 'berjingkat' },
      { label: 'Berlari', value: 'berlari' },
      { label: 'Meloncat', value: 'meloncat' },
    ],
    correctAnswer: 'berjingkat',
    hint: 'Tumit terangkat dan berat badan bertumpu pada ujung kaki.',
  },
];

export interface SortCard {
  id: string;
  title: string;
  subtitle: string;
  category: MovementId;
}

export const GAME2_CARDS: SortCard[] = [
  { id: 'c1', title: 'Berjalan ke Kelas', subtitle: 'Melangkah bergantian', category: 'berjalan' },
  { id: 'c2', title: 'Main Kejar-Kejaran', subtitle: 'Langkah cepat ke depan', category: 'berlari' },
  { id: 'c3', title: 'Lompat Lewati Garis', subtitle: 'Tolak dengan satu kaki', category: 'melompat' },
  { id: 'c4', title: 'Loncat Seperti Kelinci', subtitle: 'Tolak dan mendarat dua kaki', category: 'meloncat' },
  { id: 'c5', title: 'Berjingkat Seperti Penari', subtitle: 'Bertumpu ujung kaki', category: 'berjingkat' },
  { id: 'c6', title: 'Jalan Santai di Taman', subtitle: 'Kaki kanan kiri bergantian', category: 'berjalan' },
  { id: 'c7', title: 'Lari Pagi di Lapangan', subtitle: 'Berpindah tempat cepat', category: 'berlari' },
  { id: 'c8', title: 'Loncat Bersama Teman', subtitle: 'Dua kaki terangkat bersamaan', category: 'meloncat' },
];

export interface AdventureStation {
  station: number;
  title: string;
  scene: VisualSceneId;
  question: string;
  options: string[];
  correctIndex: number;
  lokoCheer: string;
}

export const ADVENTURE_STATIONS: AdventureStation[] = [
  {
    station: 1,
    title: 'Pos 1: Gerbang Taman',
    scene: 'berjalan',
    question: 'Apa arti gerak lokomotor?',
    options: [
      'Gerakan yang membuat kita berpindah tempat',
      'Gerakan diam di satu tempat saja',
      'Gerakan tidur di kasur',
    ],
    correctIndex: 0,
    lokoCheer: 'Pintar! Gerak lokomotor membuat tubuh kita berpindah tempat!',
  },
  {
    station: 2,
    title: 'Pos 2: Lintasan Lari',
    scene: 'berlari',
    question: 'Saat bermain kejar-kejaran dengan langkah cepat, gerakan yang kita lakukan adalah ....',
    options: ['Duduk santai', 'Berlari', 'Tidur'],
    correctIndex: 1,
    lokoCheer: 'Hore! Kamu berlari cepat melewati Pos 2!',
  },
  {
    station: 3,
    title: 'Pos 3: Garis Lompat',
    scene: 'melompat',
    question: 'Untuk melewati garis dengan tolakan satu kaki, kita melakukan gerak ....',
    options: ['Melompat', 'Berdiri diam', 'Membaca'],
    correctIndex: 0,
    lokoCheer: 'Hebat! Tolakan satu kaki itu namanya melompat!',
  },
  {
    station: 4,
    title: 'Pos 4: Jembatan Kelinci',
    scene: 'meloncat',
    question: 'Kelinci LOKO bertolak dan mendarat dengan kedua kaki. Gerakan ini disebut ....',
    options: ['Berjalan', 'Menulis', 'Meloncat'],
    correctIndex: 2,
    lokoCheer: 'Boing! Loncatanmu mantap seperti kelinci LOKO!',
  },
  {
    station: 5,
    title: 'Pos 5: Panggung Penari',
    scene: 'berjingkat',
    question: 'Gerakan berjalan yang bertumpu pada ujung kaki disebut ....',
    options: ['Berjingkat', 'Berbaring', 'Duduk'],
    correctIndex: 0,
    lokoCheer: 'Luar biasa! Sebentar lagi LOKO sampai di garis FINISH!',
  },
];

export interface QuizQuestion {
  id: number;
  scene: VisualSceneId;
  question: string;
  options: { key: 'A' | 'B' | 'C'; text: string }[];
  correctKey: 'A' | 'B' | 'C';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scene: 'berlari',
    question: 'Gerakan yang membuat tubuh berpindah tempat disebut ....',
    options: [
      { key: 'A', text: 'Gerak lokomotor' },
      { key: 'B', text: 'Gerak diam' },
      { key: 'C', text: 'Gerak tidur' },
    ],
    correctKey: 'A',
    explanation: 'Gerak lokomotor adalah gerakan yang membuat tubuh berpindah tempat.',
  },
  {
    id: 2,
    scene: 'berjalan',
    question: 'Contoh gerakan berjalan adalah ....',
    options: [
      { key: 'A', text: 'Duduk' },
      { key: 'B', text: 'Berjalan menuju kelas' },
      { key: 'C', text: 'Tidur' },
    ],
    correctKey: 'B',
    explanation: 'Berjalan menuju kelas membuat tubuh kita berpindah tempat.',
  },
  {
    id: 3,
    scene: 'berlari',
    question: 'Berlari dilakukan dengan langkah ....',
    options: [
      { key: 'A', text: 'Cepat' },
      { key: 'B', text: 'Diam' },
      { key: 'C', text: 'Tidur' },
    ],
    correctKey: 'A',
    explanation: 'Berlari adalah gerak berpindah tempat dengan langkah cepat.',
  },
  {
    id: 4,
    scene: 'meloncat',
    question: 'Gerakan meloncat menggunakan ....',
    options: [
      { key: 'A', text: 'Kedua kaki' },
      { key: 'B', text: 'Kedua tangan' },
      { key: 'C', text: 'Kepala' },
    ],
    correctKey: 'A',
    explanation: 'Meloncat bertolak dan mendarat menggunakan kedua kaki.',
  },
  {
    id: 5,
    scene: 'melompat',
    question: 'Gerakan melompat dapat diawali dengan tolakan ....',
    options: [
      { key: 'A', text: 'Satu kaki' },
      { key: 'B', text: 'Kepala' },
      { key: 'C', text: 'Kedua tangan' },
    ],
    correctKey: 'A',
    explanation: 'Melompat diawali tolakan satu kaki.',
  },
  {
    id: 6,
    scene: 'berjalan',
    question: 'Ketika berjalan, kaki melangkah secara ....',
    options: [
      { key: 'A', text: 'Bergantian' },
      { key: 'B', text: 'Diam' },
      { key: 'C', text: 'Tidak bergerak' },
    ],
    correctKey: 'A',
    explanation: 'Saat berjalan, kaki kanan dan kiri melangkah bergantian.',
  },
  {
    id: 7,
    scene: 'berjingkat',
    question: 'Gerakan berjingkat menggunakan tumpuan ....',
    options: [
      { key: 'A', text: 'Tumit' },
      { key: 'B', text: 'Ujung kaki' },
      { key: 'C', text: 'Lutut' },
    ],
    correctKey: 'B',
    explanation: 'Berjingkat bertumpu pada ujung kaki.',
  },
  {
    id: 8,
    scene: 'berlari',
    question: 'Manakah contoh gerak lokomotor?',
    options: [
      { key: 'A', text: 'Berlari' },
      { key: 'B', text: 'Duduk' },
      { key: 'C', text: 'Berdiri diam' },
    ],
    correctKey: 'A',
    explanation: 'Berlari membuat tubuh berpindah tempat, sehingga termasuk gerak lokomotor.',
  },
  {
    id: 9,
    scene: 'berlari',
    question: 'Saat bermain kejar-kejaran, kita melakukan gerakan ....',
    options: [
      { key: 'A', text: 'Tidur' },
      { key: 'B', text: 'Berlari' },
      { key: 'C', text: 'Duduk' },
    ],
    correctKey: 'B',
    explanation: 'Bermain kejar-kejaran dilakukan dengan gerakan berlari.',
  },
  {
    id: 10,
    scene: 'berjalan',
    question: 'Manakah yang termasuk gerakan lokomotor?',
    options: [
      { key: 'A', text: 'Berjalan' },
      { key: 'B', text: 'Membaca' },
      { key: 'C', text: 'Menulis' },
    ],
    correctKey: 'A',
    explanation: 'Berjalan adalah gerakan berpindah tempat.',
  },
];
