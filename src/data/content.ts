export const EVENT_TARGET_ISO = '2026-10-10T09:00:00+05:30';
export const EVENT_DATES_LABEL = '10 · OCT · 2026';
export const VENUE_SHORT = 'C. Abdul Hakeem College of Engineering & Technology · Vellore';
export const ORGANIZER = 'Department of Artificial Intelligence and Machine Learning';
export const INSTAGRAM_URL = 'https://www.instagram.com/aiml_cahcet?stkn=MTVqZDNuNGRxaTV5dg==';
export const INSTAGRAM_HANDLE = '@aiml_cahcet';
export const UNAVAILABLE = 'Details will be announced by the organizers.';
export const SITE_NAME = 'INTELLETTO-26';

export const TEAM = {
  hod: 'Mrs. M. Dhanalakshmi',
  facultyCoordinator: 'Mr. Yoga Moorthy R',
  studentCoordinators: ['Iman shihad', 'Naeemullah.R', 'Jayaprakash.B', 'Rizwan']
};

export const STUDENT_COORDINATORS = ['Nayeemullah.R', 'Jayaprakash.B', 'Md Tauseef Saleem V'];
export interface EventCrew {
  unit: string;
  coordinators: string[];
  team: string[];
}

export const EVENT_CREW: Record<string, EventCrew> = {
  'technical-quiz': { unit: 'Technical Quiz', coordinators: ['Hasni Mubarak', 'Sanjana V'], team: ['Azeez', 'Nithish Kumar', 'Vaishnavi'] },
  'ai-web-design': { unit: 'AI – Web Design', coordinators: ['Fareeduddeen', 'Sumaiya J'], team: ['Mohammed Ameen', 'Mohammed Affan', 'Shalini'] },
  'coding-debugging': { unit: 'AI – Web Design', coordinators: ['Fareeduddeen', 'Sumaiya J'], team: ['Mohammed Ameen', 'Mohammed Affan', 'Shalini'] },
  'paper-presentation': { unit: 'Paper Presentation / Poster', coordinators: ['Jagan', 'Rasika'], team: ['Vijay', 'Falak', 'Harish Priyan'] },
  'prompt-clash': { unit: 'Prompt Clash', coordinators: ['Nizzamuddin', 'Yuvarani'], team: ['Evinesh', 'Priyanka V.'] },
  'prompt-wars': { unit: 'Prompt Clash', coordinators: ['Nizzamuddin', 'Yuvarani'], team: ['Evinesh', 'Priyanka V.'] },
  'free-fire': { unit: 'E-Sports (Free Fire)', coordinators: ['Sabarivasan'], team: ['Shanmugam', 'Imran', 'Yukesh'] },
  'quest-of-mind': { unit: 'Quest of Mind', coordinators: ['Arif', 'Priyanka I'], team: ['Aiman', 'Pooja Shree'] },
  'connections': { unit: 'Quest of Mind', coordinators: ['Arif', 'Priyanka I'], team: ['Aiman', 'Pooja Shree'] },
  'squid-game': { unit: 'Squid Game', coordinators: ['Emad Ur Rahman', 'Samyuktha'], team: ['Mohammed Amaan', 'Hemasri B'] },
  'chess': { unit: 'Squid Game', coordinators: ['Emad Ur Rahman', 'Samyuktha'], team: ['Mohammed Amaan', 'Hemasri B'] },
  'filmography-photography': { unit: 'Filmography / Photography', coordinators: ['Ashiq', 'Sai'], team: [] },
  'art-painting': { unit: 'Filmography / Photography', coordinators: ['Ashiq', 'Sai'], team: [] },
};

export const EVENT_IMAGES: Record<string, string> = {
  'technical-quiz': '/media/e-quiz.jpg',
  'ai-web-design': '/media/g-code.jpg',
  'coding-debugging': '/media/g-code.jpg',
  'paper-presentation': '/media/g-stage.jpg',
  'prompt-clash': '/media/e-ai.jpg',
  'prompt-wars': '/media/e-ai.jpg',
  'free-fire': '/media/g-esports.jpg',
  'quest-of-mind': '/media/e-quest.jpg',
  'connections': '/media/e-quest.jpg',
  'squid-game': '/media/g-chess.jpg',
  'chess': '/media/g-chess.jpg',
  'filmography-photography': '/media/e-photo.jpg',
  'art-painting': '/media/e-photo.jpg',
  'mini-hackathon': '/media/e-hack.jpg',
  'shark-tank-sgc': '/media/e-pitch.jpg',
  'mehendi': '/media/e-mehndi.jpg',
  'cooking-without-fire': '/media/g-cooking.jpg',
  'ipl-auction': '/media/e-cricket.jpg',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'team', label: 'Team', path: '/team' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'schedule', label: 'Schedule', path: '/schedule' },
  { id: 'rules', label: 'Rules', path: '/rules' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'faq', label: 'FAQ', path: '/faq' },
  { id: 'contact', label: 'Contact', path: '/contact' },
] as const;

export interface RuleBlock {
  id: string;
  code: string;
  title: string;
  points: string[];
}

export const RULES: RuleBlock[] = [
  {
    id: 'general',
    code: 'PROTOCOL 01',
    title: 'General Rules',
    points: [
      'Every player must carry a valid college identity card and registration confirmation for arena entry.',
      'Report to the venue at least 45 minutes before your scheduled arena slot.',
      'The organizers decisions across all rounds are final and binding.',
      'Any form of malpractice, impersonation or misconduct leads to instant elimination.',
    ],
  },
  {
    id: 'technical',
    code: 'PROTOCOL 02',
    title: 'Technical Events',
    points: [
      'Bring your own laptops, chargers and hardware where the arena format requires it.',
      'Code, papers and prompts submitted must be original work of the registered player or squad.',
      'Round-wise briefings will be given by arena coordinators before every stage begins.',
      UNAVAILABLE,
    ],
  },
  {
    id: 'non-technical',
    code: 'PROTOCOL 03',
    title: 'Non-Technical Events',
    points: [
      'Required materials and props must be arranged by players unless stated otherwise at the venue desk.',
      'For gaming arenas, players must arrive with charged devices and stable game accounts.',
      'Judging criteria will be announced by the coordinators at the start of each event.',
      UNAVAILABLE,
    ],
  },
  {
    id: 'registration',
    code: 'PROTOCOL 04',
    title: 'Registration & Participation',
    points: [
      'One player registration covers entry to the symposium; arena access depends on the events selected.',
      'Team events require every squad member to complete player registration individually.',
      'On-spot registrations, if opened, will be announced at the help desk on event day.',
      UNAVAILABLE,
    ],
  },
];
