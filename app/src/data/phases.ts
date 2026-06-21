export interface PhaseDef {
  num: number;
  label: string;
  weeks: string;
  color: string;
  icon: string;
}

export const PHASES: PhaseDef[] = [
  { num: 0, label: 'Computing Foundations', weeks: 'Weeks 01-02', color: 'from-cyan-500 to-cyan-600', icon: 'Monitor' },
  { num: 1, label: 'OS & CLI Foundations', weeks: 'Weeks 03-06', color: 'from-teal-500 to-teal-600', icon: 'Terminal' },
  { num: 2, label: 'Scripting & Automation', weeks: 'Weeks 07-10', color: 'from-blue-500 to-blue-600', icon: 'Code' },
  { num: 3, label: 'Networking Deep Dive', weeks: 'Weeks 11-14', color: 'from-indigo-500 to-indigo-600', icon: 'Globe' },
  { num: 4, label: 'Wireless Security', weeks: 'Week 15', color: 'from-violet-500 to-violet-600', icon: 'Wifi' },
  { num: 5, label: 'Security+ Prep', weeks: 'Weeks 16-24', color: 'from-orange-500 to-orange-600', icon: 'Shield' },
  { num: 6, label: 'Cloud Security', weeks: 'Weeks 25-28', color: 'from-sky-500 to-sky-600', icon: 'Cloud' },
  { num: 7, label: 'Web App Security', weeks: 'Weeks 29-34', color: 'from-red-500 to-red-600', icon: 'Globe' },
  { num: 8, label: 'Network Pentesting', weeks: 'Weeks 35-38', color: 'from-rose-500 to-rose-600', icon: 'Target' },
  { num: 9, label: 'Defensive Sec + SIEM', weeks: 'Weeks 39-42', color: 'from-emerald-500 to-emerald-600', icon: 'BarChart3' },
  { num: 10, label: 'Active Directory Attack/Defense', weeks: 'Weeks 43-45', color: 'from-purple-500 to-purple-600', icon: 'Users' },
  { num: 11, label: 'Platform Hardening', weeks: 'Weeks 46-49', color: 'from-amber-500 to-amber-600', icon: 'Shield' },
  { num: 12, label: 'DevSecOps & Secure Coding', weeks: 'Weeks 50-51', color: 'from-cyan-600 to-teal-600', icon: 'Code' },
  { num: 13, label: 'Advanced Topics', weeks: 'Weeks 52-55', color: 'from-pink-500 to-pink-600', icon: 'Sparkles' },
  { num: 14, label: 'Review, Interview Prep & Career', weeks: 'Weeks 56-58', color: 'from-emerald-600 to-teal-600', icon: 'GraduationCap' },
];

export function getPhaseByNum(num: number): PhaseDef | undefined {
  return PHASES.find(p => p.num === num);
}

export function getPhasesWithCerts(): PhaseDef[] {
  return PHASES.filter(p => p.num <= 6);
}

// Maps old cert phase numbers (1-6) to new phase definitions
export function getCertPhase(oldNum: number): PhaseDef | undefined {
  const map: Record<number, number> = { 1: 0, 2: 2, 3: 5, 4: 8, 5: 11, 6: 14 };
  return getPhaseByNum(map[oldNum] ?? oldNum);
}
