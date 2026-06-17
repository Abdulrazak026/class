import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, XCircle, Award, ArrowRight, Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../data';
import { saveAttempt, getTopicProgress, TopicProgress } from '../utils/quizStore';

interface QuizModalProps {
  topicId: string;
  topicTitle: string;
  quiz?: QuizQuestion[];
  onClose: () => void;
  onPass: () => void;
}

export function QuizModal({ topicId, topicTitle, quiz, onClose, onPass }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pastProgress, setPastProgress] = useState<TopicProgress | null>(null);

  const questions = quiz || [];

  useEffect(() => {
    getTopicProgress(topicId).then(setPastProgress);
  }, [topicId]);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: idx }));
  };

  const handleReveal = () => {
    setRevealed(true);
    const q = questions[currentQuestion];
    if (q) {
      const selected = selectedAnswers[currentQuestion];
      saveAttempt(topicId, {
        question: q.question,
        selectedIndex: selected ?? -1,
        correctIndex: q.correctAnswerIndex,
        correct: selected === q.correctAnswerIndex,
        timestamp: Date.now(),
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const score = Object.entries(selectedAnswers).filter(
    ([qIdx, ans]) => questions[Number(qIdx)]?.correctAnswerIndex === ans
  ).length;

  const passed = score >= Math.ceil(questions.length * 0.6);

  if (questions.length === 0) {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-2xl p-8 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <p className="text-center text-slate-600">No quiz available for this topic.</p>
            <button onClick={onClose} className="mt-4 w-full bg-accent text-white py-2 rounded-lg font-bold">Close</button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (finished) {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-2xl p-8 max-w-sm w-full shadow-xl text-center" onClick={e => e.stopPropagation()}>
            <div className="mb-4">{passed ? <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /> : <XCircle className="w-16 h-16 text-red-400 mx-auto" />}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{passed ? 'Congratulations!' : 'Keep Learning!'}</h3>
            <p className="text-slate-600 mb-2">Score: {score}/{questions.length}</p>
            {pastProgress && pastProgress.totalAttempts > 0 && (
              <p className="text-slate-400 text-xs mb-2">Lifetime: {pastProgress.correctAttempts}/{pastProgress.totalAttempts} correct</p>
            )}
            <p className="text-slate-500 text-sm mb-6">{passed ? 'You passed the quiz!' : 'Review the material and try again.'}</p>
            <button onClick={() => { if (passed) onPass(); onClose(); }}
              className="w-full bg-accent text-white py-2.5 rounded-lg font-bold hover:bg-accent-dark transition-all">
              {passed ? 'Mark Complete' : 'Close'}
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const q = questions[currentQuestion];
  const selected = selectedAnswers[currentQuestion];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-surface rounded-2xl p-8 max-w-lg w-full shadow-xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-sm text-accent">Quiz</h3>
              <p className="text-xs text-slate-500">{topicTitle}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${
                i <= currentQuestion ? (selectedAnswers[i] !== undefined && questions[i].correctAnswerIndex === selectedAnswers[i] ? 'bg-emerald-500' : 'bg-slate-300') : 'bg-slate-200'
              }`} />
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-500">Question {currentQuestion + 1} of {questions.length}</p>
            {q.difficulty && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                q.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
                q.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>{q.difficulty}</span>
            )}
          </div>
          <p className="text-lg font-bold text-slate-800 mb-6">{q.question}</p>

          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = revealed && i === q.correctAnswerIndex;
              const isWrong = revealed && isSelected && !isCorrect;
              let btnClass = 'border-border bg-white hover:bg-deeper text-slate-700';
              if (revealed && isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
              else if (revealed && isWrong) btnClass = 'border-red-500 bg-red-50 text-red-800';
              else if (isSelected) btnClass = 'border-accent bg-accent/5 text-accent';

              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${btnClass}`}>
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

          {!revealed ? (
            <button onClick={handleReveal} disabled={selected === undefined}
              className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Check Answer
            </button>
          ) : (
            <div className="space-y-3">
              {q.explanation && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-indigo-700 uppercase mb-1">Explanation</p>
                    <p className="text-sm text-indigo-900 leading-relaxed">{q.explanation}</p>
                    {q.certTags && q.certTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {q.certTags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <button onClick={handleNext}
                className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all flex items-center justify-center gap-2">
                {currentQuestion < questions.length - 1 ? <>Next <ArrowRight className="w-4 h-4" /></> : 'See Results'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
