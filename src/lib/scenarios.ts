/**
 * Scenario-based content mapping.
 * Maps training content into contextual scenarios instead of manual-based folders.
 * The underlying file structure stays the same — this is a presentation layer.
 */

export interface Scenario {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name
  coverGradient: string;
  articles: ScenarioArticleRef[];
}

export interface ScenarioArticleRef {
  manual: string;
  section: string;
  slug: string;
  label?: string; // optional override for display title
}

export const scenarios: Scenario[] = [
  {
    slug: 'at-the-door',
    title: 'At the Door',
    subtitle: 'The first 30 seconds that change everything',
    description: 'Door approaches, case opens, needs audits, objection handling, and the verbal jiu-jitsu that books quality appointments.',
    icon: 'DoorOpen',
    coverGradient: 'from-emerald-950 via-emerald-900 to-kin-green',
    articles: [
      { manual: 'setter-manual', section: 'sales-training', slug: 'door-pitch-2026' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'door-pitch-2025' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'case-open' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'needs-audit' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'maintain-control-needs-audit' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'adapted-co-hot-hood' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'solving-on-the-door' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'verbal-jiujitsu' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'smokescreens' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'getting-the-bill' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'sdge-story' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'icebreakers' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'nonverbal-communication' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'paraverbal-communication' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'powerful-position-statements' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'types-of-questions' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'drill-down-questions' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'additional-ammo' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'low-bill-revisited' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'door-pitch-hvac' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'knocking-an-install' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'solidifying-the-appointment' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'stickier-appointments' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'schedule-them' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'lead-calling' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'text-templates-setter' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'text-templates-selfgen' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'path-progression' },
      { manual: 'setter-manual', section: 'sales-training', slug: 'griffin-hill-basics', label: 'Griffin Hill: Case Open & Needs Audit' },
      { manual: 'setter-manual', section: 'solar-education', slug: 'solar-basics-for-setters' },
      { manual: 'setter-manual', section: 'bootcamp', slug: 'first-week-orientation' },
    ],
  },
  {
    slug: 'at-the-kitchen-table',
    title: 'At the Kitchen Table',
    subtitle: 'Where trust becomes commitment',
    description: 'Solution presentations, financing conversations, objection handling, closing techniques, and the proof plays that seal the deal.',
    icon: 'Handshake',
    coverGradient: 'from-amber-950 via-amber-900 to-kin-gold',
    articles: [
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'griffin-hill-closing', label: 'Griffin Hill: Closing Framework' },
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'solution-presentation-ppa' },
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'overcoming-objections' },
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'cognitive-preference-theory' },
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'signing-docs-word-tracks' },
      { manual: 'closer-manual', section: 'solution-presentation', slug: 'solidifying-the-appointment' },
      { manual: 'closer-manual', section: 'lender-guide', slug: 'financing-options' },
      { manual: 'closer-manual', section: 'lender-guide', slug: 'distributed-energy' },
      { manual: 'closer-manual', section: 'competitor-analysis', slug: 'competitor-overview' },
    ],
  },
  {
    slug: 'on-the-job',
    title: 'On the Job',
    subtitle: 'From signed contract to powered home',
    description: 'Equipment specs, roofing assessments, installation processes, operations workflows, and job management from permit to power-on.',
    icon: 'HardHat',
    coverGradient: 'from-slate-950 via-slate-800 to-slate-700',
    articles: [
      { manual: 'closer-manual', section: 'equipment', slug: 'equipment-overview' },
      { manual: 'closer-manual', section: 'roofing', slug: 'roofing-assessment' },
      { manual: 'closer-manual', section: 'operations', slug: 'operations-overview' },
    ],
  },
  {
    slug: 'building-your-empire',
    title: 'Building Your Empire',
    subtitle: 'Scale yourself, then scale your team',
    description: 'Team norms, recruiting, mindset training, digital marketing, goal setting, and the playbook for going from rep to leader.',
    icon: 'Crown',
    coverGradient: 'from-kin-black via-gray-900 to-gray-800',
    articles: [
      { manual: 'setter-manual', section: 'team-norms', slug: 'setter-team-norms' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'team-norms' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'standards' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'daily-routine' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'weekly-planning' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'go-far-together' },
      { manual: 'builder-playbook', section: 'team-norms', slug: 'interview-questions' },
      { manual: 'builder-playbook', section: 'mindset', slug: 'winning-mindset' },
      { manual: 'builder-playbook', section: 'mindset', slug: 'grit' },
      { manual: 'builder-playbook', section: 'mindset', slug: 'levels-of-motivation' },
      { manual: 'builder-playbook', section: 'mindset', slug: 'goal-setting-theory' },
      { manual: 'builder-playbook', section: 'mindset', slug: 'dominate-your-next-year' },
      { manual: 'builder-playbook', section: 'sales-training', slug: 'griffin-hill-basics', label: 'Griffin Hill: Full System & Coaching' },
      { manual: 'builder-playbook', section: 'sales-training', slug: 'getting-the-bill' },
      { manual: 'builder-playbook', section: 'sales-training', slug: 'knocking-an-install' },
      { manual: 'builder-playbook', section: 'solar-education', slug: 'solar-basics' },
      { manual: 'builder-playbook', section: 'digital-domination', slug: 'digital-marketing' },
    ],
  },
];

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return scenarios.find((s) => s.slug === slug);
}
