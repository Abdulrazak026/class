import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Lightbulb, TrendingUp, Users, DollarSign, BarChart3, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

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
    title: 'Coffee Shop Sales Decline',
    industry: 'Retail / Food & Beverage',
    context: 'You are a junior cybersecurity analyst at a regional coffee shop chain "Brew & Bean." Over the past 4 weeks, sales at the downtown location have dropped 18% compared to the same period last year. The manager has given you the sales data, foot traffic logs, and weather data. What do you do first?',
    question: 'What is the most appropriate first step?',
    options: [
      { id: 's1a', text: 'Immediately recommend a discount campaign to boost sales', correct: false, explanation: 'Jumping to solutions without analysis is a common mistake. You need to understand the root cause first.', impact: 'Cost: ~$5,000 in discounts with no guarantee of success' },
      { id: 's1b', text: 'Clean and explore the data, looking for patterns and anomalies before forming any hypotheses', correct: true, explanation: 'Excellent! A cybersecurity analyst always starts by understanding the data quality and exploring patterns before making recommendations.', impact: 'Identified a key insight: a new competitor opened nearby and a construction project reduced foot traffic' },
      { id: 's1c', text: 'Ask the manager what they think and go with their gut feeling', correct: false, explanation: 'While manager input is valuable, decisions should be data-driven, not based solely on intuition.', impact: 'Missed opportunity to discover data-driven insights' },
      { id: 's1d', text: 'Start building a dashboard without checking the data quality first', correct: false, explanation: 'Building dashboards on dirty data leads to misleading conclusions. Data quality check always comes first.', impact: 'Dashboard showed misleading trends due to missing data from a broken sensor' },
    ],
  },
  {
    id: 's2',
    title: 'Marketing Campaign ROI',
    industry: 'E-commerce / Marketing',
    context: 'Your online fashion retailer ran three different marketing campaigns last month: email ($10,000), social media ($25,000), and influencer partnerships ($40,000). The sales data shows: Email generated $50,000 in revenue, Social Media $75,000, and Influencer $60,000. Your CMO wants to know which campaign had the best ROI and which should receive more budget next quarter.',
    question: 'What is your analysis?',
    options: [
      { id: 's2a', text: 'Influencer partnerships had the highest revenue ($60K), so they deserve more budget', correct: false, explanation: 'Total revenue alone is misleading. You must account for the investment cost to calculate ROI.', impact: 'Budget misallocation: invested more in the lowest-ROI channel' },
      { id: 's2b', text: 'Email had the best ROI at 400% (5:1 return) and should be scaled up', correct: true, explanation: 'Correct! Email: ($50K - $10K) / $10K = 400% ROI. Social: 200%. Influencer: 50%. Email outperformed significantly.', impact: 'Email budget increased by 150%, generating an additional $75K in profit' },
      { id: 's2c', text: 'Social media had the highest total sales ($75K), so it performed best', correct: false, explanation: 'Absolute revenue does not account for cost. ROI gives the true picture of efficiency.', impact: 'Missed opportunity: continued funding a lower-ROI channel' },
      { id: 's2d', text: 'Cancel all campaigns because none generated massive profits', correct: false, explanation: 'Throwing out all campaigns is an overreaction. Data-driven optimization is more effective than cutting everything.', impact: 'Revenue dropped 40% the following month with no campaigns running' },
    ],
  },
  {
    id: 's3',
    title: 'Employee Retention Analysis',
    industry: 'HR / Technology',
    context: 'Your tech company has seen a 25% increase in employee turnover this year. You have data on: salary, department, years at company, performance scores, commute distance, and exit interview comments. The board wants a retention strategy. What pattern would you look for first?',
    question: 'Which analysis approach would yield the most actionable insight?',
    options: [
      { id: 's3a', text: 'Look only at salary data, assuming people leave for higher pay', correct: false, explanation: 'While salary matters, exit interviews reveal other factors like management, culture, and growth opportunities.', impact: 'Raised salaries across the board at a cost of $2M, but turnover only decreased by 5%' },
      { id: 's3b', text: 'Segment employees by department and compare retention rates, then investigate the highest-turnover departments through exit interview text analysis', correct: true, explanation: 'Excellent! Segmentation helps identify specific problem areas, and text analysis gives qualitative context for the quantitative data.', impact: 'Found Engineering had 45% turnover due to management issues. New management training reduced turnover by 60% in 6 months.' },
      { id: 's3c', text: 'Build a machine learning model to predict which employees will quit', correct: false, explanation: 'ML is premature without first understanding the patterns through exploratory analysis. Start simple.', impact: 'Model had 70% accuracy but provided no actionable insights on how to improve retention' },
      { id: 's3d', text: 'Ignore the data and implement a company-wide wellness program', correct: false, explanation: 'Wellness programs are nice, but without data, you might miss the real issues causing turnover.', impact: 'Wellness program cost $500K but didn\'t address the core management issues' },
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
          <Briefcase className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-slate-800">Business Scenario</span>
          {!finished && <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">{currentScenario + 1}/{SCENARIOS.length}</span>}
        </div>
        <button onClick={handleReset} className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
      </div>

      {!finished ? (
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
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
