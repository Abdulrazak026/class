import localforage from 'localforage';

export interface QuizAttempt {
  question: string;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
  timestamp: number;
}

export interface TopicProgress {
  topicId: string;
  totalAttempts: number;
  correctAttempts: number;
  lastAttempt: number;
}

const quizDb = localforage.createInstance({ name: 'cybercamp-quiz', storeName: 'attempts' });
const progressDb = localforage.createInstance({ name: 'cybercamp-quiz', storeName: 'progress' });

export async function saveAttempt(topicId: string, attempt: QuizAttempt): Promise<void> {
  const key = `${topicId}::${attempt.timestamp}`;
  await quizDb.setItem(key, attempt);
  const pKey = `progress::${topicId}`;
  const existing = await progressDb.getItem<TopicProgress>(pKey);
  const updated: TopicProgress = {
    topicId,
    totalAttempts: (existing?.totalAttempts ?? 0) + 1,
    correctAttempts: (existing?.correctAttempts ?? 0) + (attempt.correct ? 1 : 0),
    lastAttempt: attempt.timestamp,
  };
  await progressDb.setItem(pKey, updated);
}

export async function getAttempts(topicId: string): Promise<QuizAttempt[]> {
  const results: QuizAttempt[] = [];
  await quizDb.iterate<any, void>((value, key) => {
    if (key.startsWith(`${topicId}::`)) results.push(value as QuizAttempt);
  });
  return results.sort((a, b) => a.timestamp - b.timestamp);
}

export async function getTopicProgress(topicId: string): Promise<TopicProgress | null> {
  return progressDb.getItem<TopicProgress>(`progress::${topicId}`);
}

export async function getAllProgress(): Promise<TopicProgress[]> {
  const results: TopicProgress[] = [];
  await progressDb.iterate<any, void>((value) => {
    results.push(value as TopicProgress);
  });
  return results.sort((a, b) => b.lastAttempt - a.lastAttempt);
}

export async function clearQuizData(): Promise<void> {
  await quizDb.clear();
  await progressDb.clear();
}
