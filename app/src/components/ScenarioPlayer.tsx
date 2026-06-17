import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lightbulb, AlertTriangle, Wifi, Lock, Server, CheckCircle2, XCircle, ArrowRight, RotateCcw, BarChart3 } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  industry: string;
  context: string;
  question: string;
  options: { id: string; text: string; correct: boolean; explanation: string; impact: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'Suspicious Email Investigation',
    industry: 'SOC / Incident Response',
    context: 'You are a Tier 1 SOC analyst. A user from the Finance department reports receiving an email claiming to be from IT support, asking them to click a link and enter their credentials. The email was sent at 3:47 AM from an external address. Three other users received the same email but have not opened it yet. What is your first action?',
    question: 'What is the most appropriate first step?',
    options: [
      { id: 's1a', text: 'Delete the email from all inboxes immediately and close the ticket', correct: false, explanation: 'Deleting the email without investigation destroys evidence and prevents you from understanding the scope of the attack.', impact: 'Lost forensic evidence. Attackers could retry with a similar campaign since no IOC were collected.' },
      { id: 's1b', text: 'Preserve the email headers, check if anyone clicked the link, block the sender domain, and scan for IOCs', correct: true, explanation: 'Correct! Initial triage means: preserve evidence (headers), assess impact (who clicked?), contain (block sender), and hunt for indicators (scan for related IOCs).', impact: 'Identified one user who clicked the link. Reset their credentials immediately. Blocked sender domain across the org. Created detection rule for similar emails.' },
      { id: 's1c', text: 'Forward the email to all employees as a warning example', correct: false, explanation: 'Forwarding a malicious email to everyone risks spreading the threat. Never forward suspicious emails.', impact: 'Employees started clicking the link out of curiosity, causing additional credential compromises.' },
      { id: 's1d', text: 'Ignore it since only one person reported it and it is probably nothing', correct: false, explanation: 'A single report of a phishing email could indicate a broader campaign. Every alert must be triaged, not ignored.', impact: 'The phishing campaign went undetected for 2 more days. 15 additional accounts were compromised.' },
    ],
  },
  {
    id: 's2',
    title: 'Unusual Outbound Traffic',
    industry: 'Network Security / SOC',
    context: 'At 2 AM, your SIEM generates an alert: a domain controller is sending 500 MB of outbound traffic to an IP address in a country you have no business with. The traffic is on port 443 (HTTPS) and has been running for 3 hours. Your shift lead asks you to investigate. Where do you start?',
    question: 'What should you investigate first?',
    options: [
      { id: 's2a', text: 'Block the outbound IP immediately and reboot the domain controller', correct: false, explanation: 'Blocking immediately destroys the attacker\'s connection but also eliminates your ability to observe their activity and identify the scope of compromise.', impact: 'Attacker connection severed but scope unknown. They regained access 2 days later through a different backdoor.' },
      { id: 's2b', text: 'Check DNS logs for beaconing patterns, review Windows Event Logs for suspicious processes, capture netflow data, and identify what data was accessed', correct: true, explanation: 'Correct! Systematic investigation: DNS logs reveal C2 patterns. Event logs show processes. Netflow captures traffic metadata. This builds the full picture before taking action.', impact: 'Discovered ransomware staging: attacker had exfiltrated AD database. Initiated incident response protocol, contained 3 compromised hosts, prevented full deployment.' },
      { id: 's2c', text: 'Run an antivirus scan on the domain controller and close the alert if nothing is found', correct: false, explanation: 'AV alone cannot detect sophisticated threats, especially if the attacker is using legitimate tools (LOLBins) and encrypted traffic.', impact: 'Antivirus found nothing. Attack proceeded to encrypt files 4 hours later. Major incident declared.' },
      { id: 's2d', text: 'Call the CEO at 2 AM to inform them of a potential breach', correct: false, explanation: 'Escalation is important but should follow the SOP. First investigate to understand the severity, then escalate with facts, not speculation.', impact: 'CEO was unnecessarily alarmed. When a real breach was confirmed hours later, trust in the SOC team was diminished.' },
    ],
  },
  {
    id: 's3',
    title: 'Multiple Critical Alerts — Prioritization',
    industry: 'SOC Triage / Incident Management',
    context: 'You start your shift and find three Critical alerts in the queue: (1) IDS alert showing possible SQL injection attempts against the customer-facing web application from an external IP, (2) Endpoint EDR alert showing a suspicious PowerShell script executed on the CFO\'s laptop, (3) CloudTrail alert showing a new IAM user created with AdministratorAccess policy in the production AWS account. You are the only analyst on shift. What do you prioritize?',
    question: 'In what order should you triage these alerts?',
    options: [
      { id: 's3a', text: 'CFO laptop first (could be C-level compromise), then AWS IAM (privilege escalation risk), then SQL injection (external scanning is common)', correct: false, explanation: 'The CFO laptop is concerning but the PowerShell may be benign admin activity. The AWS IAM with full admin access is an immediate privilege escalation risk that could destroy the entire cloud environment.', impact: 'While investigating the CFO laptop, the attacker used the admin IAM user to delete all S3 buckets and terminate EC2 instances.' },
      { id: 's3b', text: 'AWS IAM user first (immediate privilege escalation), then CFO laptop (potential C2), then SQL injection (ongoing but may be automated scanning)', correct: true, explanation: 'Correct! Prioritize by blast radius: AWS admin access = entire cloud at risk. CFO laptop = single endpoint. SQL injection attempts = may be automated probes vs confirmed breach. Contain the biggest threat first.', impact: 'Disabled the malicious IAM user within 2 minutes. CFO laptop investigation found benign update script. SQL injection attempts were automated scanner noise. Correct prioritization prevented catastrophic cloud breach.' },
      { id: 's3c', text: 'SQL injection first (customer data is always the highest priority), then CFO laptop, then AWS', correct: false, explanation: 'While customer data is important, SQL injection attempts from external IPs are common and may not indicate a successful breach. An active AWS admin compromise is an immediate, confirmed threat.', impact: 'While investigating SQL injection (which was just scanning), the attacker used AWS admin access to exfiltrate 50 GB of customer data and demand ransom.' },
      { id: 's3d', text: 'Open three tickets simultaneously and try to work on all of them at once', correct: false, explanation: 'Multitasking on critical incidents leads to mistakes. Focus on one at a time, properly triage each, and escalate if overwhelmed.', impact: 'Lost track of the AWS alert while switching between incidents. The compromise went undetected for another 20 minutes.' },
    ],
  },
];

export function ScenarioPlayer() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<{ scenario: number; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[currentScenario];

  const handleSelect = (optionId: string) => {
    if (revealed) return;
    setSelectedOption(optionId);
  };

  const handleReveal = () => {
    if (!selectedOption) return;
    const option = scenario.options.find(o => o.id === selectedOption);
    setRevealed(true);
    setResults(prev => [...prev, { scenario: currentScenario, correct: option?.correct || false }]);
  };

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentScenario(0);
    setSelectedOption(null);
    setRevealed(false);
    setResults([]);
    setFinished(false);
  };

  const score = results.filter(r => r.correct).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-slate-800">Security Scenario</span>
          {!finished && <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">{currentScenario + 1}/{SCENARIOS.length}</span>}
        </div>
        <button onClick={handleReset} className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
      </div>

      {!finished ? (
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            {scenario.industry}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{scenario.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{scenario.context}</p>
          </div>

          <div className="mb-4">
            <p className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {scenario.question}
            </p>
            <div className="space-y-2">
              {scenario.options.map((opt, optIdx) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = revealed && opt.correct;
                const isWrong = revealed && isSelected && !opt.correct;
                let btnClass = 'border-border bg-white hover:bg-deeper text-slate-700';
                if (revealed && isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
                else if (revealed && isWrong) btnClass = 'border-red-500 bg-red-50 text-red-800';
                else if (isSelected) btnClass = 'border-purple-500 bg-purple-50 text-purple-800';

                return (
                  <button key={opt.id} onClick={() => handleSelect(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${btnClass}`}>
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 mt-0.5 ${
                        revealed && isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' :
                        revealed && isWrong ? 'border-red-500 bg-red-500 text-white' :
                        isSelected ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300 text-slate-500'
                       }`}>{String.fromCharCode(65 + optIdx)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{opt.text}</p>
                        {revealed && (
                          <div className="mt-2 text-xs text-slate-500 space-y-1">
                            <p>{opt.explanation}</p>
                            <p className="font-semibold text-slate-600">Outcome: {opt.impact}</p>
                          </div>
                        )}
                      </div>
                      {revealed && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />}
                      {revealed && isWrong && <XCircle className="w-5 h-5 shrink-0 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-500">Score: {results.filter(r => r.correct).length}/{results.length}</div>
            {!revealed ? (
              <button onClick={handleReveal} disabled={!selectedOption}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                Check Answer
              </button>
            ) : (
              <button onClick={handleNext}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition-all flex items-center gap-2 text-sm">
                {currentScenario < SCENARIOS.length - 1 ? <>Next <ArrowRight className="w-4 h-4" /></> : 'See Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="mb-4">
            {score === SCENARIOS.length ? (
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            ) : (
              <BarChart3 className="w-16 h-16 text-purple-500 mx-auto" />
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Scenario Analysis Complete</h3>
          <p className="text-slate-600 mb-1">Score: {score}/{SCENARIOS.length}</p>
          <p className="text-sm text-slate-500 mb-6">
            {score === SCENARIOS.length ? 'Perfect score! You have strong analytical thinking skills.' :
             score >= 2 ? 'Good job! Think about why each answer is correct or incorrect.' :
             'Review the scenarios and think about the data-driven approach.'}
          </p>
          <button onClick={handleReset}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2 mx-auto text-sm">
            <RotateCcw className="w-4 h-4" /> Retry Scenarios
          </button>
        </div>
      )}
    </motion.div>
  );
}
