import React, { useState } from 'react';
import { Shield, Award, CheckCircle2, Clock, ExternalLink, Calendar, DollarSign, TrendingUp, BarChart3, Target, BookOpen, ChevronRight } from 'lucide-react';
import { PHASES, getCertPhase } from '../data/phases';

interface CertInfo {
  id: string;
  name: string;
  issuer: string;
  cost: number;
  annualFee: number;
  validity: string;
  format: string;
  prerequisites: string;
  dod8140: string;
  salaryImpact: string;
  phase: number;
  recommendedWeek: string;
  prepTimeWeeks: number;
  category: 'entry' | 'mid' | 'senior' | 'expert';
  url: string;
  passed?: boolean;
  score?: number;
  date?: string;
}

const CERTS: CertInfo[] = [
  {
    id: 'secplus', name: 'CompTIA Security+', issuer: 'CompTIA', cost: 392, annualFee: 0,
    validity: '3 years (CEU) / Lifetime (CE) since 2024', format: '90 min, max 90 questions, PBQ + MCQ',
    prerequisites: 'None (Network+ recommended)', dod8140: 'IAT Level II, IAM Level I',
    salaryImpact: '+15-25% vs. non-certified entry roles', phase: 2, recommendedWeek: 'Week 15',
    prepTimeWeeks: 8, category: 'entry', url: 'https://www.comptia.org/certifications/security',
  },
  {
    id: 'networkplus', name: 'CompTIA Network+', issuer: 'CompTIA', cost: 358, annualFee: 0,
    validity: '3 years (CEU) / Lifetime (CE) since 2024', format: '90 min, max 90 questions, PBQ + MCQ',
    prerequisites: 'None', dod8140: 'IAT Level I',
    salaryImpact: '+10-15% for network roles', phase: 1, recommendedWeek: 'Week 06',
    prepTimeWeeks: 6, category: 'entry', url: 'https://www.comptia.org/certifications/network',
  },
  {
    id: 'cysa', name: 'CompTIA CySA+', issuer: 'CompTIA', cost: 392, annualFee: 0,
    validity: '3 years (CEU) / Lifetime (CE) since 2024', format: '165 min, max 85 questions, PBQ + MCQ',
    prerequisites: 'Security+ recommended (or 3-4 years experience)', dod8140: 'IAT Level II, IAM Level I, CSSP Analyst',
    salaryImpact: '+20-30% vs. Security+ alone', phase: 3, recommendedWeek: 'Week 24',
    prepTimeWeeks: 8, category: 'mid', url: 'https://www.comptia.org/certifications/cybersecurity-analyst',
  },
  {
    id: 'casp', name: 'CompTIA CASP+', issuer: 'CompTIA', cost: 466, annualFee: 0,
    validity: '3 years (CEU)', format: '165 min, max 90 questions, PBQ + MCQ',
    prerequisites: '10+ years experience or Security+/CySA+', dod8140: 'IAM Level III, IAT Level III, CSSP Manager',
    salaryImpact: '+25-35% senior roles', phase: 5, recommendedWeek: 'Week 42',
    prepTimeWeeks: 10, category: 'senior', url: 'https://www.comptia.org/certifications/comptia-advanced-security-practitioner',
  },
  {
    id: 'ceh', name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', cost: 1199, annualFee: 80,
    validity: '3 years (120 ECE credits)', format: '4 hours, 125 MCQ',
    prerequisites: '2 years infosec experience (or training course)', dod8140: 'CSSP Analyst, Infrastructure Support',
    salaryImpact: '+15-20% for offensive roles', phase: 3, recommendedWeek: 'Week 28',
    prepTimeWeeks: 8, category: 'mid', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
  },
  {
    id: 'oscp', name: 'OSCP (Offensive Security Certified Professional)', issuer: 'Offensive Security', cost: 1649, annualFee: 0,
    validity: 'Lifetime (no renewal)', format: '24-hour practical exam + 48-hour lab report',
    prerequisites: 'Strong pentesting knowledge', dod8140: 'CSSP Analyst, Infrastructure Support',
    salaryImpact: '+30-50% for pentesting roles', phase: 4, recommendedWeek: 'Week 36',
    prepTimeWeeks: 12, category: 'mid', url: 'https://www.offensive-security.com/pwk-oscp/',
  },
  {
    id: 'cissp', name: 'CISSP (Certified Information Systems Security Professional)', issuer: 'ISC2', cost: 749, annualFee: 125,
    validity: '3 years (CPE credits)', format: '3 hours, 100-150 CAT questions (adaptive)',
    prerequisites: '5 years experience in 2+ domains (or 4 years + degree / cert)', dod8140: 'IAM Level III, IAT Level III, CSSP Manager',
    salaryImpact: '+35-50% — avg. salary $135K+', phase: 6, recommendedWeek: 'Week 48',
    prepTimeWeeks: 14, category: 'senior', url: 'https://www.isc2.org/Certifications/CISSP',
  },
  {
    id: 'ccsp', name: 'CCSP (Certified Cloud Security Professional)', issuer: 'ISC2', cost: 599, annualFee: 125,
    validity: '3 years (CPE credits)', format: '3 hours, 125 MCQ',
    prerequisites: '5 years experience (3 in IT, 1 in cloud) + CISSP or equivalent', dod8140: 'IAM Level II, CSSP Analyst',
    salaryImpact: '+30-40% for cloud security roles', phase: 5, recommendedWeek: 'Week 44',
    prepTimeWeeks: 10, category: 'senior', url: 'https://www.isc2.org/Certifications/CCSP',
  },
  {
    id: 'gsna', name: 'GIAC Systems and Network Auditor (GSNA)', issuer: 'SANS/GIAC', cost: 949, annualFee: 0,
    validity: '4 years (renew by retake or CPE)', format: '3 hours, 75-100 MCQ',
    prerequisites: 'Security+ or equivalent', dod8140: 'CSSP Auditor',
    salaryImpact: '+20-30% audit/compliance roles', phase: 4, recommendedWeek: 'Week 34',
    prepTimeWeeks: 8, category: 'mid', url: 'https://www.giac.org/certifications/systems-network-auditor-gsna/',
  },
  {
    id: 'pmp', name: 'PMP (Project Management Professional)', issuer: 'PMI', cost: 555, annualFee: 129,
    validity: '3 years (PDU credits)', format: '230 min, 180 MCQ',
    prerequisites: '36 months leading projects (if degree) + 35 hours PM education',
    dod8140: 'N/A — complements security management',
    salaryImpact: '+20-30% for security management roles', phase: 6, recommendedWeek: 'Week 52',
    prepTimeWeeks: 10, category: 'expert', url: 'https://www.pmi.org/certifications/project-management-pmp',
  },
  {
    id: 'aws_scs', name: 'AWS Certified Security - Specialty', issuer: 'AWS', cost: 300, annualFee: 0,
    validity: '3 years (renew by retake)', format: '170 min, 65 MCQ',
    prerequisites: '1+ year AWS security experience', dod8140: 'CSSP Infrastructure Support',
    salaryImpact: '+25-35% cloud security roles', phase: 5, recommendedWeek: 'Week 46',
    prepTimeWeeks: 8, category: 'senior', url: 'https://aws.amazon.com/certification/certified-security-specialty/',
  },
];

export function CertTracker() {
  const [certs, setCerts] = useState(CERTS);
  const [viewMode, setViewMode] = useState<'grid' | 'roadmap'>('roadmap');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const passed = certs.filter(c => c.passed).length;
  const totalCost = certs.filter(c => c.passed).reduce((s, c) => s + c.cost, 0);
  const totalPotential = certs.reduce((s, c) => s + c.cost, 0);

  const markPassed = (id: string) => {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, passed: !c.passed, date: !c.passed ? new Date().toISOString().slice(0, 10) : undefined } : c));
  };

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Certification Tracker</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400">{passed}/{certs.length} passed</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setViewMode('roadmap')}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'roadmap' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Roadmap
            </button>
            <button onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'grid' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Grid
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {viewMode === 'roadmap' && (() => {
          const oldPhaseNums = [...new Set(certs.map(c => c.phase))].sort();
          return (
          <div className="space-y-4">
            {oldPhaseNums.map(oldNum => {
              const phase = getCertPhase(oldNum);
              const phaseCerts = certs.filter(c => c.phase === oldNum);
              if (!phase || phaseCerts.length === 0) return null;
              const phasePassed = phaseCerts.filter(c => c.passed).length;
              return (
                <div key={oldNum}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                      {oldNum}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{phase.label}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">{phasePassed}/{phaseCerts.length}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ml-11">
                    {phaseCerts.map(cert => {
                      const isSelected = selectedCert === cert.id;
                      return (
                        <div key={cert.id} onClick={() => setSelectedCert(isSelected ? null : cert.id)}
                          className={`border rounded-xl p-3 cursor-pointer transition-all ${
                            cert.passed ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700' :
                            isSelected ? 'border-accent ring-2 ring-accent/20 bg-accent/5' : 'border-gray-200 dark:border-gray-600 hover:border-accent/40'
                          }`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                cert.category === 'entry' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                cert.category === 'mid' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                                cert.category === 'senior' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                              }`}>{cert.category}</span>
                              {cert.passed && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                            </div>
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{cert.issuer} — {cert.name}</h4>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                            <DollarSign className="w-3 h-3" /> ${cert.cost}
                            <Calendar className="w-3 h-3 ml-1" /> {cert.recommendedWeek}
                          </div>
                          {isSelected && (
                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                              <p className="text-[9px] text-gray-500"><span className="font-bold">Format:</span> {cert.format}</p>
                              <p className="text-[9px] text-gray-500"><span className="font-bold">Prereqs:</span> {cert.prerequisites}</p>
                              <p className="text-[9px] text-gray-500"><span className="font-bold">DoD 8140:</span> {cert.dod8140}</p>
                              <p className="text-[9px] text-gray-500"><span className="font-bold">Salary Impact:</span> {cert.salaryImpact}</p>
                              {cert.annualFee > 0 && <p className="text-[9px] text-gray-500"><span className="font-bold">Annual Fee:</span> ${cert.annualFee}</p>}
                              <p className="text-[9px] text-gray-500"><span className="font-bold">Prep Time:</span> {cert.prepTimeWeeks} weeks</p>
                              <div className="flex gap-2 mt-2">
                                <button onClick={(e) => { e.stopPropagation(); markPassed(cert.id); }}
                                  className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${
                                    cert.passed ? 'bg-gray-100 text-gray-500 dark:bg-gray-700' : 'bg-accent text-white hover:bg-accent-dark'
                                  }`}>
                                  {cert.passed ? 'Mark Not Passed' : 'Mark Passed'}
                                </button>
                                <a href={cert.url} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[10px] font-bold text-accent hover:text-accent-dark bg-accent/5 px-2.5 py-1.5 rounded-lg transition-all"
                                  onClick={e => e.stopPropagation()}>
                                  <ExternalLink className="w-3 h-3" /> Details
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          );
        })()}

        {viewMode === 'grid' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Certification</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Issuer</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Cost</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Level</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Phase</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {certs.map(cert => (
                  <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-2.5 px-3 font-bold text-gray-800 dark:text-gray-200 text-[11px]">{cert.name}</td>
                    <td className="py-2.5 px-3 text-gray-500">{cert.issuer}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-600">${cert.cost}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        cert.category === 'entry' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        cert.category === 'mid' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                        cert.category === 'senior' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      }`}>{cert.category}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">Phase {cert.phase}</td>
                    <td className="py-2.5 px-3">
                      {cert.passed ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600"><CheckCircle2 className="w-3 h-3" /> Passed</span>
                      ) : (
                        <span className="text-[10px] text-gray-400">Not taken</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <button onClick={() => markPassed(cert.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                          cert.passed ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 hover:bg-gray-200' : 'bg-accent/10 text-accent hover:bg-accent/20'
                        }`}>
                        {cert.passed ? 'Undo' : 'Mark ✓'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Passed', value: `${passed}/${certs.length}`, icon: Award, color: 'text-green-500' },
            { label: 'Investment', value: `$${totalCost}`, icon: DollarSign, color: 'text-accent' },
            { label: 'Total Potential', value: `$${totalPotential}`, icon: TrendingUp, color: 'text-amber-500' },
            { label: 'Completion', value: `${Math.round((passed / certs.length) * 100)}%`, icon: Target, color: 'text-blue-500' },
          ].map(stat => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <StatIcon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                <p className="text-sm font-black text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
