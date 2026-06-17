import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, RotateCw, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { buildQuestionPool } from '../utils/examStore';
import { getCurriculum } from '../utils/dataLoader';
import type { QuizQuestion } from '../data';

interface FlashcardDeckProps {
  certFilter: string[];
}

export function FlashcardDeck({ certFilter }: FlashcardDeckProps) {
  const [cards, setCards] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  const loadCards = useCallback(() => {
    const curriculum = getCurriculum();
    const pool = buildQuestionPool(curriculum, certFilter, [], 50);
    setCards(pool.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setRevealed(false);
    setMastered(new Set());
  }, [certFilter]);

  useMemo(() => {
    if (cards.length === 0) loadCards();
  }, [loadCards, cards.length]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">Loading flashcards...</p>
      </div>
    );
  }

  const card = cards[currentIndex];
  if (!card) return null;

  const handleNext = () => {
    setRevealed(false);
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  const handleMaster = () => {
    setMastered(prev => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
    handleNext();
  };

  const remaining = cards.length - mastered.size;
  const shownCount = new Set<number>();
  for (let i = 0; i <= currentIndex; i++) shownCount.add(i);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-slate-700">Flashcards</span>
          <p className="text-xs text-slate-400">{mastered.size} mastered · {remaining} remaining</p>
        </div>
        <button onClick={loadCards} className="text-xs text-accent hover:text-accent-dark flex items-center gap-1">
          <RotateCw className="w-3 h-3" /> Reshuffle
        </button>
      </div>

      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${remaining > 0 ? ((cards.length - remaining) / cards.length) * 100 : 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.3 }}
          className="bg-white border-2 border-gray-200 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer"
          onClick={() => !revealed && setRevealed(true)}>
          {!revealed ? (
            <>
              <p className="text-lg font-bold text-slate-800 mb-3">{card.question}</p>
              <div className="mt-4 space-y-1.5">
                {card.options.map((opt, i) => (
                  <div key={i} className="text-sm text-slate-500 bg-gray-50 rounded-lg px-4 py-2">{String.fromCharCode(65 + i)}) {opt}</div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">Click to reveal answer</p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  card.correctAnswerIndex === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>Answer: {String.fromCharCode(65 + card.correctAnswerIndex)}</span>
                {card.difficulty && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    card.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
                    card.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{card.difficulty}</span>
                )}
              </div>
              <p className="text-lg font-bold text-emerald-800 mb-2">{String.fromCharCode(65 + card.correctAnswerIndex)}) {card.options[card.correctAnswerIndex]}</p>
              {card.explanation && (
                <div className="mt-3 bg-indigo-50 rounded-xl p-4 flex items-start gap-3 w-full">
                  <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-900 leading-relaxed text-left">{card.explanation}</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-4">
        {revealed && (
          <button onClick={handleMaster}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Got It
          </button>
        )}
        <button onClick={handleNext}
          className={`${revealed ? 'flex-1' : 'w-full'} bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent-dark transition-all flex items-center justify-center gap-2`}>
          {revealed ? 'Skip' : 'Next'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
