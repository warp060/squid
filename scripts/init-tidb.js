import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.resolve(rootDir, '.env') });

const SEED_EVENTS = [
  {
    slug: 'technical-quiz',
    name: 'Technical Quiz',
    category: 'technical',
    tagline: 'Test your computing fundamentals, algorithmic speed, and rapid-fire tech instincts.',
    description: 'A multi-tier intellectual battleground testing computer science fundamentals, emerging technologies, algorithms, logic, and rapid-fire trivia. Survive the prelims to enter the buzzer finals.',
    icon: 'BrainCircuit',
    stage_code: 'STAGE // ALPHA',
    team_size: '2 Players',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '50/-',
    team_fee: '100/-',
    prize: '300/200',
    duration: '',
    eligibility: 'All Engineering & Tech Students',
    rules: [
      'Round 1: Rapid-fire objective screening (40 questions, 30 minutes).',
      'Top 6 teams qualify for the stage buzzer rounds.',
      'Negative marking applies in final buzzer challenges.',
      'Use of mobile devices or external aids results in instant disqualification.',
      'Decision of quiz masters and coordinators is final.'
    ],
    venue_hint: 'Main Seminar Hall',
    fee: '₹50/- per head · ₹100/- per team',
    sort_order: 1,
  },
  {
    slug: 'ai-web-design',
    name: 'AI – Web Design',
    category: 'technical',
    tagline: 'Harness generative AI, intelligent layouts, and high-fidelity frontends under tight combat constraints.',
    description: 'Design and assemble next-generation web experiences utilizing modern AI design tools, rapid prototyping frameworks, and frontend precision. Judged on aesthetics, responsiveness, UX innovation, and prompt mastery.',
    icon: 'Code2',
    stage_code: 'STAGE // BETA',
    team_size: '1 — 2 Players',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '50/-',
    team_fee: '100/-',
    prize: '300/200',
    duration: '',
    eligibility: 'All UG / PG Students',
    rules: [
      'Theme will be revealed on-the-spot at the start of the round.',
      'Participants may use AI tools, modern CSS, and frontend libraries.',
      'Submissions must be responsive and deployed or runnable locally.',
      'Originality in prompt crafting and visual hierarchy will carry highest weight.',
      'Plagiarism of existing templates without modification is forbidden.'
    ],
    venue_hint: 'Advanced Computing Lab 1',
    fee: '₹50/- per head · ₹100/- per team',
    sort_order: 2,
  },
  {
    slug: 'paper-presentation',
    name: 'Paper Presentation / Poster',
    category: 'technical',
    tagline: 'Defend innovative research, technical architectures, and visual posters before the grand jury.',
    description: 'Present original research papers or structured poster presentations highlighting cutting-edge advances in AI, Cloud, Cybersecurity, IoT, Blockchain, or Sustainable Engineering.',
    icon: 'FileText',
    stage_code: 'STAGE // GAMMA',
    team_size: '2 — 3 Players',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '100/-',
    team_fee: '150/-',
    prize: '500/300',
    duration: '',
    eligibility: 'All Engineering & Polytechnic Students',
    rules: [
      'Submit presentation slides (PPT/PDF) or printed/digital poster prior to stage slot.',
      '7 minutes presentation followed by 3 minutes defense with the jury.',
      'Evaluation based on novelty, technical depth, clarity, and Q&A defense.',
      'All team members must actively participate in presentation or answering queries.'
    ],
    venue_hint: 'Conference Auditorium B',
    fee: '₹100/- per head · ₹150/- per team',
    sort_order: 3,
  },
  {
    slug: 'prompt-clash',
    name: 'Prompt Clash',
    category: 'technical',
    tagline: 'Master prompt architecture, outsmart LLMs, and craft targeted AI outputs in a head-to-head arena.',
    description: 'Enter the prompt engineering arena. Solve complex generative challenges by crafting pinpoint prompts that extract precise target outputs, jailbreaks, image synthesis, or logic puzzle solutions from leading foundation models.',
    icon: 'Sparkles',
    stage_code: 'STAGE // DELTA',
    team_size: 'Solo or Duo (1 — 2 Players)',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '50/-',
    team_fee: '100/-',
    prize: '300/200',
    duration: '',
    eligibility: 'Open to All Registrants',
    rules: [
      'Round 1: Target text extraction and constraint satisfaction.',
      'Round 2: Generative visual reconstruction from benchmark references.',
      'Judged on prompt brevity, efficiency, and fidelity to target metrics.',
      'Coordinators will specify prohibited tokens and test environment.'
    ],
    venue_hint: 'AI & Data Science Lab',
    fee: '₹50/- per head · ₹100/- per team',
    sort_order: 4,
  },
  {
    slug: 'free-fire',
    name: 'E-Sports (Free Fire)',
    category: 'non-technical',
    tagline: 'Battle royale survival, tactical positioning, and lightning reflexes on the virtual battleground.',
    description: 'Drop into the battleground. Squad up and survive intense combat rounds where strategic coordination, aim precision, and zone control determine the supreme champions of INTELLETTO-26.',
    icon: 'Gamepad2',
    stage_code: 'STAGE // EPSILON',
    team_size: 'Squad (4 Players)',
    member_limit: 'Team of 4 members',
    per_head_fee: '-',
    team_fee: '200/-',
    prize: '500/300',
    duration: '',
    eligibility: 'All Registered Symposium Players',
    rules: [
      'Custom room credentials distributed 10 minutes prior to match launch.',
      'All players must use standard mobile devices (emulators/tablets prohibited).',
      'Hacks, third-party scripts, or bug exploits lead to instant squad ban.',
      'Points calculated using official tournament survival rank + kill multipliers.'
    ],
    venue_hint: 'E-Sports Arena / Hall 3',
    fee: '₹200/- per team',
    sort_order: 5,
  },
  {
    slug: 'quest-of-mind',
    name: 'Quest of Mind',
    category: 'non-technical',
    tagline: 'Solve cryptic puzzles, decipher hidden connections, and conquer intellectual challenges.',
    description: 'An exhilarating mind-bending competition featuring visual connections, rebus puzzles, lateral thinking, and cognitive riddle gauntlets designed to push your observational intellect to the brink.',
    icon: 'Zap',
    stage_code: 'STAGE // ZETA',
    team_size: '2 Players',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '50/-',
    team_fee: '100/-',
    prize: '300/200',
    duration: '',
    eligibility: 'Open to All Registrants',
    rules: [
      'Preliminary puzzle decoding sheet determines top stage finalists.',
      'Multi-image connection rounds with decreasing clue points.',
      'Speed and lateral reasoning will score tiebreakers.',
      'Electronic devices strictly forbidden in arena.'
    ],
    venue_hint: 'Mechanical Block Seminar Room',
    fee: '₹50/- per head · ₹100/- per team',
    sort_order: 6,
  },
  {
    slug: 'squid-game',
    name: 'Squid Game',
    category: 'non-technical',
    tagline: 'High-stakes survival mini-games, psychological endurance, and thrilling eliminations.',
    description: 'Step into the arena where precision, agility, patience, and nerves of steel dictate your survival. Tackle mystery rounds inspired by iconic party and survival challenges where only one champion remains standing.',
    icon: 'Crown',
    stage_code: 'STAGE // ETA',
    team_size: 'Solo Entry (1 Player)',
    member_limit: 'Maximum of 2 members',
    per_head_fee: '50/-',
    team_fee: '100/-',
    prize: '300/200',
    duration: '',
    eligibility: 'Open to All Registrants',
    rules: [
      'Multi-stage knockout sequence: fail any round and you are eliminated.',
      'Rules for each survival game revealed immediately prior to starting.',
      'Fair play and strict coordinator oversight at all game stations.',
      'Last player standing claims the grand victory.'
    ],
    venue_hint: 'Open Air Amphitheatre / Quad',
    fee: '₹50/- per head · ₹100/- per team',
    sort_order: 7,
  },
  {
    slug: 'filmography-photography',
    name: 'Filmography / Photography',
    category: 'non-technical',
    tagline: 'Capture cinematic frames, compelling visual storytelling, and decisive artistic moments.',
    description: 'Showcase your creative lens. From striking still photography to dynamic micro-cinematography, tell powerful stories captured within the campus grounds and theme prompts.',
    icon: 'Palette',
    stage_code: 'STAGE // THETA',
    team_size: 'Solo (1 Creator)',
    member_limit: 'Maximum of 4 members',
    per_head_fee: '-',
    team_fee: '150/-',
    prize: '300/200',
    duration: '',
    eligibility: 'Open to All Photographers & Creators',
    rules: [
      'Photos/films must be captured during the symposium timeline or per theme specifications.',
      'Both DSLR and mobile entries are accepted (separate sub-categories).',
      'Basic color grading allowed; AI generation or heavy composite editing is prohibited.',
      'Exif metadata must be verifiable upon coordinator request.'
    ],
    venue_hint: 'Media & Arts Pavilion',
    fee: '₹150/- per team',
    sort_order: 8,
  },
];

const SEED_FAQS = [
  {
    question: 'What is INTELLETTO-26?',
    answer: 'INTELLETTO-26 is a national level technical symposium hosted by the Department of Artificial Intelligence & Machine Learning, featuring 8 competitive arenas across technical and non-technical divisions.',
    sort_order: 1,
  },
  {
    question: 'Who can participate?',
    answer: 'The symposium is open to undergraduate and postgraduate students from Engineering, Technology, Polytechnic, and Arts & Science colleges across India.',
    sort_order: 2,
  },
  {
    question: 'How do I register?',
    answer: 'Use the Player Registration page on this portal: pick your arenas, provide your academic & contact details, confirm your registration, and receive your unique Player Tag (IN26-XXXX).',
    sort_order: 3,
  },
  {
    question: 'Can I register for multiple events?',
    answer: 'Yes! You can choose multiple technical and non-technical arenas during registration as long as their stage schedules do not conflict.',
    sort_order: 4,
  },
  {
    question: 'What should I bring on event day?',
    answer: 'Bring a valid college student ID card, your registration confirmation / Player Tag, and laptops/chargers if participating in code/web/AI arenas.',
    sort_order: 5,
  },
];

const SEED_GALLERY = [
  { src: '/media/ev26-7.jpg', title: "Engineer's Vision 2026 Inaugural", caption: 'Auditorium Conclave & Symposium Assembly', sort_order: 1 },
  { src: '/media/ev26-1.jpg', title: 'AI Autonomous Rescue Robot', caption: 'Podium Defence · Robotics Innovation', sort_order: 2 },
  { src: '/media/ev26-2.jpg', title: 'Faculty Keynote & Mentorship', caption: 'Department Dignitaries & Organizers Address', sort_order: 3 },
  { src: '/media/ev26-3.jpg', title: 'Project OPTIK AI', caption: 'Rural Communities Computer Vision', sort_order: 4 },
  { src: '/media/ev26-4.jpg', title: 'ReVive Earth Clean Energy', caption: 'Sustainable Tech & Green Innovations', sort_order: 5 },
  { src: '/media/ev26-5.jpg', title: 'MediCura AI Healthcare', caption: 'Intelligent Medical Diagnostic Architecture', sort_order: 6 },
];

const SEED_SCHEDULE = [
  { day_label: 'DAY 01', start_time: '09:00 AM', end_time: '10:00 AM', title: 'Inaugural Protocol & Keynote Address', description: 'Assembly at the Main Auditorium with department dignitaries, faculty coordinators, and keynote remarks.', venue_hint: 'Main Seminar Hall', sort_order: 1 },
  { day_label: 'DAY 01', start_time: '10:15 AM', end_time: '01:00 PM', title: 'Arena Combat: Round 1 Prelims', description: 'Simultaneous deployment across Technical Quiz, AI Web Design, Paper Presentation, and Prompt Clash.', venue_hint: 'Department Labs & Seminar Blocks', sort_order: 2 },
  { day_label: 'DAY 01', start_time: '01:00 PM', end_time: '02:00 PM', title: 'Lunch & Tactical Debrief', description: 'Midday recharge and coordinator briefings for qualified stage finalists.', venue_hint: 'Campus Dining Pavilion', sort_order: 3 },
  { day_label: 'DAY 01', start_time: '02:00 PM', end_time: '04:30 PM', title: 'Non-Technical Arenas & Finals Showdown', description: 'Free Fire custom rooms, Quest of Mind decoding, Squid Game rounds, and photo showcase evaluation.', venue_hint: 'Amphitheatre & Media Hall', sort_order: 4 },
  { day_label: 'DAY 01', start_time: '04:45 PM', end_time: '05:45 PM', title: 'Grand Valedictory & Prize Distribution', description: 'Trophy presentations, cash awards, and coordinator recognition ceremony.', venue_hint: 'Main Stage Auditorium', sort_order: 5 },
];

async function initTiDB() {
  console.log('⚡ INTELLETTO-26 // TiDB Cloud Initializer');
  console.log('--------------------------------------------------');

  const url = process.env.DATABASE_URL || process.env.TIDB_DATABASE_URL;
  const host = process.env.TIDB_HOST;
  const user = process.env.TIDB_USER;
  const password = process.env.TIDB_PASSWORD || '';
  const database = process.env.TIDB_DATABASE || 'test';
  const port = Number(process.env.TIDB_PORT) || 4000;

  if (!url && (!host || !user)) {
    console.error('❌ Error: TiDB credentials missing in .env!');
    console.error('Please configure TIDB_HOST, TIDB_USER, TIDB_PASSWORD in .env or provide DATABASE_URL.');
    process.exit(1);
  }

  console.log(`Connecting to TiDB Cloud cluster ${host ? `at ${host}:${port}` : 'via connection URL'}...`);

  const ssl = process.env.TIDB_ENABLE_SSL === 'false' ? undefined : {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  };

  const connection = await mysql.createConnection(
    url ? { uri: url, ssl, multipleStatements: true } : { host, port, user, password, database, ssl, multipleStatements: true }
  );

  console.log('✓ Successfully connected to TiDB Cloud cluster!');

  // 1. Run schema DDL
  const schemaPath = path.resolve(rootDir, 'db/schema.sql');
  console.log(`Applying schema from ${schemaPath}...`);
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Clean SQL comments before splitting into separate statements
  const cleanSql = schemaSql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');

  const statements = cleanSql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await connection.query(stmt);
  }
  console.log(`✓ Applied ${statements.length} DDL statements successfully.`);

  // 2. Seed Events
  console.log('Seeding official events...');
  for (const ev of SEED_EVENTS) {
    await connection.execute(
      `INSERT INTO events (slug, name, category, tagline, description, icon, stage_code, team_size, member_limit, per_head_fee, team_fee, prize, duration, eligibility, rules, venue_hint, fee, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name), category = VALUES(category), tagline = VALUES(tagline),
         description = VALUES(description), icon = VALUES(icon), stage_code = VALUES(stage_code),
         team_size = VALUES(team_size), member_limit = VALUES(member_limit), per_head_fee = VALUES(per_head_fee),
         team_fee = VALUES(team_fee), prize = VALUES(prize), duration = VALUES(duration),
         eligibility = VALUES(eligibility), rules = VALUES(rules), venue_hint = VALUES(venue_hint),
         fee = VALUES(fee), sort_order = VALUES(sort_order)`,
      [
        ev.slug, ev.name, ev.category, ev.tagline, ev.description, ev.icon, ev.stage_code,
        ev.team_size, ev.member_limit, ev.per_head_fee, ev.team_fee, ev.prize, ev.duration,
        ev.eligibility, JSON.stringify(ev.rules), ev.venue_hint, ev.fee, ev.sort_order,
      ]
    );
  }
  console.log(`✓ Seeded ${SEED_EVENTS.length} arena events.`);

  // 3. Seed FAQs
  console.log('Seeding FAQs...');
  for (const f of SEED_FAQS) {
    const [existing] = await connection.execute('SELECT id FROM faqs WHERE question = ? LIMIT 1', [f.question]);
    if (!existing.length) {
      await connection.execute(
        'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
        [f.question, f.answer, f.sort_order]
      );
    }
  }
  console.log(`✓ Seeded ${SEED_FAQS.length} FAQs.`);

  // 4. Seed Gallery
  console.log('Seeding gallery frames...');
  for (const g of SEED_GALLERY) {
    const [existing] = await connection.execute('SELECT id FROM gallery_items WHERE src = ? LIMIT 1', [g.src]);
    if (!existing.length) {
      await connection.execute(
        'INSERT INTO gallery_items (src, title, caption, sort_order) VALUES (?, ?, ?, ?)',
        [g.src, g.title, g.caption, g.sort_order]
      );
    }
  }
  console.log(`✓ Seeded ${SEED_GALLERY.length} gallery items.`);

  // 5. Seed Schedule
  console.log('Seeding symposium timeline...');
  for (const s of SEED_SCHEDULE) {
    const [existing] = await connection.execute('SELECT id FROM schedule_items WHERE title = ? AND day_label = ? LIMIT 1', [s.title, s.day_label]);
    if (!existing.length) {
      await connection.execute(
        'INSERT INTO schedule_items (day_label, start_time, end_time, title, description, venue_hint, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [s.day_label, s.start_time, s.end_time, s.title, s.description, s.venue_hint, s.sort_order]
      );
    }
  }
  console.log(`✓ Seeded ${SEED_SCHEDULE.length} schedule timeline entries.`);

  console.log('--------------------------------------------------');
  console.log('🎉 TiDB Cloud database initialized and seeded successfully!');
  await connection.end();
}

initTiDB().catch((err) => {
  console.error('❌ Failed to initialize TiDB:', err.message);
  process.exit(1);
});
