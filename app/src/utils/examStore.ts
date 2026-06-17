import localforage from 'localforage';
import type { QuizQuestion } from '../data';

export interface ExamAnswer {
  questionIndex: number;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
  question: string;
  explanation?: string;
}

export interface ExamSession {
  id: string;
  timestamp: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeMs: number;
  certFilter: string[];
  answers: ExamAnswer[];
}

const sessionDb = localforage.createInstance({ name: 'cybercamp-exam', storeName: 'sessions' });
const statsDb = localforage.createInstance({ name: 'cybercamp-exam', storeName: 'stats' });

export async function saveExamSession(session: ExamSession): Promise<void> {
  const id = session.id || `exam-${Date.now()}`;
  session.id = id;
  await sessionDb.setItem(id, session);

  const allSessions = await getAllSessions();
  const totalExams = allSessions.length;
  const totalCorrect = allSessions.reduce((s, e) => s + e.correctAnswers, 0);
  const totalQuestions = allSessions.reduce((s, e) => s + e.totalQuestions, 0);
  await statsDb.setItem('overall', {
    totalExams,
    totalCorrect,
    totalQuestions,
    averageScore: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
    lastExam: session.timestamp,
  });
}

export async function getAllSessions(): Promise<ExamSession[]> {
  const results: ExamSession[] = [];
  await sessionDb.iterate<any, void>((value) => {
    results.push(value as ExamSession);
  });
  return results.sort((a, b) => b.timestamp - a.timestamp);
}

export async function getExamStats(): Promise<{ totalExams: number; totalCorrect: number; totalQuestions: number; averageScore: number; lastExam: number } | null> {
  return statsDb.getItem('overall');
}

export async function clearExamData(): Promise<void> {
  await sessionDb.clear();
  await statsDb.clear();
}

export function buildQuestionPool(
  curriculum: { topics: { quiz?: QuizQuestion[] }[] }[],
  certFilter: string[] = [],
  difficultyFilter: string[] = [],
  count: number = 50,
): QuizQuestion[] {
  const all: QuizQuestion[] = [];
  for (const mod of curriculum) {
    for (const topic of mod.topics) {
      if (!topic.quiz) continue;
      for (const q of topic.quiz) {
        let include = true;
        if (certFilter.length > 0) {
          if (!q.certTags || q.certTags.length === 0) include = false;
          else if (!q.certTags.some(t => certFilter.includes(t))) include = false;
        }
        if (difficultyFilter.length > 0) {
          if (!q.difficulty) include = false;
          else if (!difficultyFilter.includes(q.difficulty)) include = false;
        }
        if (include) all.push(q);
      }
    }
  }

  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
