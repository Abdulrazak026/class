import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, TrendingUp, GraduationCap, BookOpen, Users, Star, Shield, ArrowRight, ExternalLink, ChevronDown, Globe, LineChart, Target } from 'lucide-react';

const TRACKS = [
  {
    id: 'soc', title: 'SOC Analyst (Blue Team)', icon: Shield, color: 'from-cyan-500 to-teal-500',
    description: 'Monitor, detect, and respond to security incidents in real-time. The highest-hiring entry point in cybersecurity.',
    entryRole: 'SOC Analyst L1', midRole: 'SOC Analyst L2/L3', seniorRole: 'SOC Manager / Lead',
    salary: [
      { region: 'US', entry: '$55-75K', mid: '$85-110K', senior: '$120-160K' },
      { region: 'UK', entry: '£25-35K', mid: '£40-55K', senior: '£60-85K' },
      { region: 'EU', entry: '€30-45K', mid: '€50-70K', senior: '€75-100K' },
      { region: 'India', entry: '₹4-8L', mid: '₹10-18L', senior: '₹20-35L' },
      { region: 'Remote', entry: '$40-60K', mid: '$70-95K', senior: '$100-140K' },
    ],
    certPath: 'Security+ → CySA+ → GCIA → CISSP',
    skills: ['SIEM (Splunk, ELK)', 'EDR (CrowdStrike, SentinelOne)', 'Network Analysis', 'Incident Response', 'Threat Intel'],
  },
  {
    id: 'pentest', title: 'Penetration Tester (Red Team)', icon: Target, color: 'from-red-500 to-orange-500',
    description: 'Ethically hack systems to find vulnerabilities before attackers do. High autonomy and continuous learning.',
    entryRole: 'Junior Pentester', midRole: 'Pentester', seniorRole: 'Lead Pentester / Red Team Lead',
    salary: [
      { region: 'US', entry: '$70-90K', mid: '$100-140K', senior: '$150-200K+' },
      { region: 'UK', entry: '£30-45K', mid: '£50-75K', senior: '£80-120K' },
      { region: 'EU', entry: '€35-55K', mid: '€55-85K', senior: '€85-130K' },
      { region: 'India', entry: '₹6-12L', mid: '₹15-25L', senior: '₹30-50L' },
      { region: 'Remote', entry: '$55-80K', mid: '$85-125K', senior: '$130-180K' },
    ],
    certPath: 'Security+ → CEH → OSCP → OSEP',
    skills: ['Web App Testing', 'Network Pentesting', 'Social Engineering', 'Exploit Development', 'Report Writing'],
  },
  {
    id: 'dfir', title: 'Digital Forensics & IR', icon: Shield, color: 'from-blue-500 to-indigo-500',
    description: 'Investigate breaches, collect evidence, and help organizations recover from attacks.',
    entryRole: 'Jr. Forensics Analyst', midRole: 'Forensics Investigator', seniorRole: 'DFIR Lead / Director',
    salary: [
      { region: 'US', entry: '$60-80K', mid: '$90-120K', senior: '$130-175K' },
      { region: 'UK', entry: '£28-38K', mid: '£45-65K', senior: '£70-100K' },
      { region: 'EU', entry: '€32-48K', mid: '€50-75K', senior: '€75-115K' },
      { region: 'India', entry: '₹5-10L', mid: '₹12-20L', senior: '₹22-40L' },
      { region: 'Remote', entry: '$45-70K', mid: '$75-105K', senior: '$110-155K' },
    ],
    certPath: 'Security+ → CySA+ → GCFE → GCFA',
    skills: ['Memory Forensics', 'Disk Forensics', 'Malware Analysis', 'Log Analysis', 'Chain of Custody'],
  },
  {
    id: 'cloudsec', title: 'Cloud Security', icon: Globe, color: 'from-blue-400 to-cyan-500',
    description: 'Secure cloud infrastructure across AWS, Azure, and GCP. Fastest-growing security domain.',
    entryRole: 'Cloud Security Analyst', midRole: 'Cloud Security Engineer', seniorRole: 'Cloud Security Architect',
    salary: [
      { region: 'US', entry: '$75-95K', mid: '$110-145K', senior: '$150-200K+' },
      { region: 'UK', entry: '£32-45K', mid: '£50-75K', senior: '£80-125K' },
      { region: 'EU', entry: '€38-55K', mid: '€55-85K', senior: '€85-135K' },
      { region: 'India', entry: '₹6-12L', mid: '₹15-28L', senior: '₹30-50L' },
      { region: 'Remote', entry: '$60-85K', mid: '$90-130K', senior: '$135-185K' },
    ],
    certPath: 'Security+ → CCSP → AWS Security → CISSP',
    skills: ['Cloud IAM', 'Container Security', 'Infra as Code', 'Cloud Networking', 'Compliance'],
  },
  {
    id: 'grc', title: 'Governance, Risk & Compliance', icon: BookOpen, color: 'from-emerald-500 to-teal-500',
    description: 'Bridge between security and business — policies, risk assessments, and regulatory compliance.',
    entryRole: 'GRC Analyst', midRole: 'GRC Consultant', seniorRole: 'CISO / Chief Compliance Officer',
    salary: [
      { region: 'US', entry: '$60-80K', mid: '$90-125K', senior: '$140-200K+' },
      { region: 'UK', entry: '£28-40K', mid: '£45-70K', senior: '£75-120K' },
      { region: 'EU', entry: '€32-50K', mid: '€50-80K', senior: '€85-140K' },
      { region: 'India', entry: '₹5-10L', mid: '₹12-22L', senior: '₹25-45L' },
      { region: 'Remote', entry: '$45-70K', mid: '$75-110K', senior: '$120-175K' },
    ],
    certPath: 'Security+ → CISA → CISM → CISSP',
    skills: ['Policy Development', 'Risk Assessment', 'Audit', 'Compliance (SOC2, HIPAA, PCI)', 'Vendor Risk'],
  },
  {
    id: 'vulnerability', title: 'Vulnerability Management', icon: Target, color: 'from-purple-500 to-pink-500',
    description: 'Identify, classify, and remediate vulnerabilities across enterprise environments.',
    entryRole: 'Vulnerability Analyst', midRole: 'VM Engineer', seniorRole: 'VM Program Manager',
    salary: [
      { region: 'US', entry: '$55-75K', mid: '$80-110K', senior: '$115-150K' },
      { region: 'UK', entry: '£25-35K', mid: '£40-60K', senior: '£65-90K' },
      { region: 'EU', entry: '€30-45K', mid: '€45-70K', senior: '€70-100K' },
      { region: 'India', entry: '₹4-8L', mid: '₹10-18L', senior: '₹20-32L' },
      { region: 'Remote', entry: '$40-65K', mid: '$70-100K', senior: '$100-140K' },
    ],
    certPath: 'Security+ → CySA+ → GPEN → CISSP',
    skills: ['Vulnerability Scanning (Qualys, Tenable)', 'Patch Management', 'Risk Prioritization', 'Reporting', 'Remediation'],
  },
];

const REGIONS = ['US', 'UK', 'EU', 'India', 'Remote'] as const;

const SOFT_SKILLS = [
  { name: 'Communication', desc: 'Explain complex technical issues to non-technical stakeholders and write clear incident reports.', phase: 1 },
  { name: 'Analytical Thinking', desc: 'Correlate data from multiple sources to identify patterns and root causes of security incidents.', phase: 2 },
  { name: 'Problem Solving', desc: 'Debug network issues, reverse-engineer malware, and find creative solutions to security challenges.', phase: 2 },
  { name: 'Teamwork', desc: 'Collaborate across SOC teams, IT operations, and business units during incident response.', phase: 3 },
  { name: 'Continuous Learning', desc: 'Stay current with evolving threats, new tools, and industry certifications.', phase: 1 },
  { name: 'Ethical Judgment', desc: 'Make sound decisions under pressure with integrity and respect for privacy.', phase: 3 },
];

const EDUCATION_PATHS = [
  { path: 'Self-Taught', timeline: '6-18 months', cost: '$500-2,000', pros: ['Most affordable', 'Flexible pace', 'Learn exactly what employers want'], cons: ['No degree credential', 'Requires high discipline', 'No structured guidance'] },
  { path: 'Bootcamp', timeline: '3-9 months', cost: '$10,000-20,000', pros: ['Fast-track to job', 'Structured curriculum', 'Career services'], cons: ['Expensive', 'Variable quality', 'Limited depth'] },
  { path: 'Associate Degree', timeline: '2 years', cost: '$10,000-30,000', pros: ['Credential recognized by HR', 'Transfer to bachelor\'s', 'Financial aid available'], cons: ['Time commitment', 'May not cover cutting-edge topics'] },
  { path: 'Bachelor\'s Degree', timeline: '4 years', cost: '$40,000-120,000', pros: ['Strongest credential', 'Networking opportunities', 'Internships'], cons: ['Most expensive', 'Longest timeline', 'Theoretical focus'] },
];

export function CareerPage() {
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [salaryRegion, setSalaryRegion] = useState<typeof REGIONS[number]>('US');

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Career Paths</h1>
        <p className="text-sm text-gray-400 mt-1">Explore cybersecurity tracks, salaries, and growth opportunities</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-xs font-bold text-gray-500">Salary Region:</span>
        <div className="flex gap-1">
          {REGIONS.map(r => (
            <button key={r} onClick={() => setSalaryRegion(r)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${salaryRegion === r ? 'bg-accent text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {TRACKS.map(track => {
          const Icon = track.icon;
          const isExpanded = expandedTrack === track.id;
          const salary = track.salary.find(s => s.region === salaryRegion);

          return (
            <div key={track.id}
              className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'shadow-md ring-1 ring-accent/20' : 'hover:shadow-sm hover:border-accent/40'
              }`}>
              <button onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
                className="w-full text-left p-5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{track.title}</h3>
                    <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="text-xs text-gray-400 mr-4">{track.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px]">
                    <span className="font-bold text-gray-500">{track.entryRole}</span>
                    <span className="text-gray-300">→</span>
                    <span className="font-bold text-gray-500">{track.midRole}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-gray-900 dark:text-gray-100">{salary?.entry}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">Entry</p>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-200 dark:border-gray-700">
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 pr-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Region</th>
                              <th className="text-left py-2 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Entry</th>
                              <th className="text-left py-2 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Mid</th>
                              <th className="text-left py-2 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Senior</th>
                            </tr>
                          </thead>
                          <tbody>
                            {track.salary.map(s => (
                              <tr key={s.region} className={`border-b border-gray-100 dark:border-gray-700 ${s.region === salaryRegion ? 'bg-accent/5' : ''}`}>
                                <td className="py-2 pr-4 font-bold text-gray-700 dark:text-gray-300">{s.region}</td>
                                <td className="py-2 px-4 font-mono text-gray-600 dark:text-gray-400">{s.entry}</td>
                                <td className="py-2 px-4 font-mono text-gray-600 dark:text-gray-400">{s.mid}</td>
                                <td className="py-2 px-4 font-mono text-gray-600 dark:text-gray-400">{s.senior}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Certification Path</p>
                        <p className="text-xs font-bold text-accent">{track.certPath}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {track.skills.map(s => (
                            <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Career Ladder</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /><span className="text-gray-600 dark:text-gray-400">{track.entryRole}</span></div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-gray-600 dark:text-gray-400">{track.midRole}</span></div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-gray-600 dark:text-gray-400">{track.seniorRole}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-accent" /> Soft Skills for Cybersecurity
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {SOFT_SKILLS.map(skill => (
          <div key={skill.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{skill.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{skill.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-accent" /> Education Paths
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {EDUCATION_PATHS.map(ep => (
          <div key={ep.path} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{ep.path}</h3>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
              <span>{ep.timeline}</span>
              <span>•</span>
              <span>{ep.cost}</span>
            </div>
            <div className="mt-3 space-y-1">
              {ep.pros.map(p => <p key={p} className="text-[10px] text-green-600 dark:text-green-400 flex items-start gap-1"><span className="mt-0.5">+</span>{p}</p>)}
              {ep.cons.map(c => <p key={c} className="text-[10px] text-red-500 flex items-start gap-1"><span className="mt-0.5">−</span>{c}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
