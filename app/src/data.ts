export const BUILD_VERSION = '2026.06.16.2';

export type TaskType = 'learn' | 'practice' | 'project' | 'review' | 'lab';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  explanation?: string;
  certTags?: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  duration: string;
  content?: string;
  aiPrompt?: string;
  labUrl?: string;
  labTitle?: string;
  interviewQuestion?: string;
  interviewAnswer?: string;
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

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  cost: number;
  annualFee?: number;
  validity: string;
  format: string;
  prerequisites: string;
  dod8140?: string;
  salaryImpact?: string;
  phase: number;
  prepTimeWeeks: number;
  category: 'entry' | 'mid' | 'senior' | 'expert';
  url: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  icon: string;
  salaries: SalaryData[];
  certifications: string[];
  tools: string[];
  yearsToMid: string;
  yearsToSenior: string;
  niceCategories: string[];
}

export interface SalaryData {
  region: 'US' | 'UK' | 'EU' | 'India' | 'Remote';
  entry: string;
  mid: string;
  senior: string;
  lead: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'foundational' | 'soc' | 'pentest' | 'cloud' | 'grc' | 'dfir' | 'behavioral' | 'scenario';
  question: string;
  answer: string;
  difficulty: 'entry' | 'mid' | 'senior';
  relatedCert?: string;
  relatedTopic?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  free: boolean;
  url: string;
  description: string;
  phase: number;
}

export interface LabChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  platform: string;
  url: string;
  phase: number;
  category: string;
}

export interface SoftSkill {
  id: string;
  name: string;
  description: string;
  phase: number;
  exercises: string[];
}

export interface EducationPath {
  id: string;
  path: 'bachelors' | 'associate' | 'bootcamp' | 'self-taught';
  description: string;
  pros: string[];
  cons: string[];
  timeline: string;
  typicalCost: string;
}

