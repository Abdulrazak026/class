import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, XCircle, Clock, Award, ArrowRight, BarChart3, Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../data';
import { ExamAnswer, ExamSession, saveExamSession, buildQuestionPool } from '../utils/examStore';
import { getCurriculum } from '../utils/dataLoader';

interface ExamPlayerProps {
  onClose: () => void;
  questionCount: number;
  certFilter: string[];
  difficultyFilter: string[];
}

export function ExamPlayer({ onClose, questionCount, certFilter, difficultyFilter }: ExamPlayerProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [explanations, setExplanations] = useState<Record<number, string>>({});
  const [session, setSession] = useState<ExamSession | null>(null);

  useEffect(() => {
    const curriculum = getCurriculum();
    const pool = buildQuestionPool(curriculum, certFilter, difficultyFilter, questionCount);
    setQuestions(pool);
  }, [questionCount, certFilter, difficultyFilter]);

  useEffect(() => {
    if (!finished) {
      const timer = setInterval(() => setElapsed(Date.now() - startTime), 1000);
      return () => clearInterval(timer);
    }
  }, [finished, startTime]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleReveal = () => {
    if (!currentQuestion) return;
    setRevealed(true);
    if (currentQuestion.explanation) {
      setExplanations(prev => ({ ...prev, [currentIndex]: currentQuestion.explanation! }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    } else {
      finishExam();
    }
  };

  const finishExam = useCallback(async () => {
    setFinished(true);
    const answers: ExamAnswer[] = questions.map((q, i) => ({
      questionIndex: i,
      selectedIndex: selectedAnswers[i] ?? -1,
      correctIndex: q.correctAnswerIndex,
      correct: selectedAnswers[i] === q.correctAnswerIndex,
      question: q.question,
      explanation: q.explanation,
    }));
    const correct = answers.filter(a => a.correct).length;
    const timeMs = Date.now() - startTime;
    const sess: ExamSession = {
      id: `exam-${Date.now()}`,
      timestamp: Date.now(),
      totalQuestions: questions.length,
      correctAnswers: correct,
      score: Math.round((correct / questions.length) * 100),
      timeMs,
      certFilter,
      answers,
    };
    await saveExamSession(sess);
    setSession(sess);
  }, [questions, selectedAnswers, startTime, certFilter]);

  const handleCloseRef = useRef(onClose);
  handleCloseRef.current = onClose;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !finished) handleCloseRef.current();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [finished]);

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
          <p className="text-slate-600 mb-4">No questions available for the selected filters.</p>
          <button onClick={onClose} className="bg-accent text-white px-6 py-2 rounded-lg font-bold">Close</button>
        </div>
      </div>
    );
  }

  if (finished) {
    const s = session!;
    const passed = s.score >= 70;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl overflow-y-auto max-h-[90vh]">
          <div className="text-center mb-6">
            <div className="mb-4">{passed ? <Award className="w-16 h-16 text-yellow-500 mx-auto" /> : <BarChart3 className="w-16 h-16 text-indigo-500 mx-auto" />}</div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">{passed ? 'Exam Passed!' : 'Keep Studying'}</h2>
            <p className="text-4xl font-extrabold mb-2" style={{ color: passed ? '#059669' : '#dc2626' }}>{s.score}%</p>
            <p className="text-slate-600">{s.correctAnswers}/{s.totalQuestions} correct</p>
            <p className="text-slate-400 text-sm mt-1"><Clock className="w-3 h-3 inline mr-1" />{formatTime(s.timeMs)}</p>
          </div>

          <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
            {s.answers.map((a, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-sm ${a.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                <span className="truncate flex-1 mr-2">{i + 1}. {a.question}</span>
                {a.correct ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all">
            Back to Study Room
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selected = selectedAnswers[currentIndex];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h3 className="font-bold text-accent text-sm">Exam Mode</h3>
            <p className="text-xs text-slate-500">Question {currentIndex + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-500 text-sm"><Clock className="w-4 h-4" />{formatTime(elapsed)}</span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="h-1 bg-gray-200 shrink-0">
          <div className="h-full bg-accent transition-all duration-300 rounded-r" style={{ width: `${progress}%` }} />
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {currentQuestion.difficulty && (
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-3 ${
              currentQuestion.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
              currentQuestion.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>{currentQuestion.difficulty}</span>
          )}

          <p className="text-lg font-bold text-slate-800 mb-6">{currentQuestion.question}</p>

          <div className="space-y-2">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = revealed && i === currentQuestion.correctAnswerIndex;
              const isWrong = revealed && isSelected && !isCorrect;
              let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
              if (revealed && isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
              else if (revealed && isWrong) btnClass = 'border-red-500 bg-red-50 text-red-800';
              else if (isSelected) btnClass = 'border-accent bg-accent/5 text-accent';

              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ${btnClass}`}>
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    revealed && isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' :
                    revealed && isWrong ? 'border-red-500 bg-red-500 text-white' :
                    isSelected ? 'border-accent bg-accent text-white' : 'border-slate-300 text-slate-500'
                  }`}>{String.fromCharCode(65 + i)}</span>
                  <span className="font-medium">{opt}</span>
                  {revealed && isCorrect && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-emerald-500" />}
                  {revealed && isWrong && <XCircle className="w-5 h-5 ml-auto shrink-0 text-red-500" />}
                </button>
              );
            })}
          </div>

          {revealed && explanations[currentIndex] && (
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-indigo-700 uppercase mb-1">Explanation</p>
                <p className="text-sm text-indigo-900 leading-relaxed">{explanations[currentIndex]}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 shrink-0">
          {!revealed ? (
            <button onClick={handleReveal} disabled={selected === undefined}
              className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Check Answer
            </button>
          ) : (
            <button onClick={handleNext}
              className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all flex items-center justify-center gap-2">
              {currentIndex < questions.length - 1 ? <>Next <ArrowRight className="w-4 h-4" /></> : 'See Results'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
