export const BUILD_VERSION = '2026.05.19';

export type TaskType = 'learn' | 'practice' | 'project' | 'review';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  duration: string;
  content?: string;
  quiz?: QuizQuestion[];
  requirements?: string[];
}

export interface Module {
  id: string;
  title: string;
  durationText: string;
  focus: string;
  output: string;
  topics: Topic[];
}

