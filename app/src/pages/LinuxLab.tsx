import React, { useState } from 'react';
import { Terminal, CheckCircle2, Circle, ChevronRight, ChevronLeft } from 'lucide-react';
import { TerminalLab } from '../components/TerminalLab';

interface Exercise {
  id: string;
  title: string;
  description: string;
  commands: string[];
  hint: string;
}

interface Level {
  id: string;
  title: string;
  icon: string;
  exercises: Exercise[];
}

const LEVELS: Level[] = [
  {
    id: 'navigation',
    title: 'Navigation & Output',
    icon: '1',
    exercises: [
      {
        id: 'nav1',
        title: 'Where Am I?',
        description: 'Find out your current directory and who you are.',
        commands: ['pwd', 'whoami'],
        hint: 'Type pwd and press Enter, then type whoami and press Enter.',
      },
      {
        id: 'nav2',
        title: 'Look Around',
        description: 'List the files in your current directory.',
        commands: ['ls', 'ls -la'],
        hint: 'Try ls first, then ls -la for more details.',
      },
      {
        id: 'nav3',
        title: 'Move Around',
        description: 'Navigate to the /tmp directory and back home.',
        commands: ['cd /tmp', 'pwd', 'cd ~', 'pwd'],
        hint: 'Use cd /tmp to go to temp, then cd ~ to go home.',
      },
      {
        id: 'nav4',
        title: 'Print a Message',
        description: 'Use echo to print your name and current directory.',
        commands: ['echo "Hello"', 'echo $USER', 'echo $HOME'],
        hint: 'Use echo with quotes for text, $ for variables.',
      },
    ],
  },
  {
    id: 'creating',
    title: 'Creating Files & Directories',
    icon: '2',
    exercises: [
      {
        id: 'create1',
        title: 'Make a Directory',
        description: 'Create a directory called practice in your home folder.',
        commands: ['mkdir practice', 'ls'],
        hint: 'Use mkdir followed by the directory name.',
      },
      {
        id: 'create2',
        title: 'Create a File',
        description: 'Navigate into practice and create an empty file.',
        commands: ['cd practice', 'touch test.txt', 'ls -la'],
        hint: 'Use touch to create an empty file.',
      },
      {
        id: 'create3',
        title: 'Nested Directories',
        description: 'Create nested directories with one command.',
        commands: ['mkdir -p projects/webapp/src', 'ls -R'],
        hint: 'Use mkdir -p to create parent directories.',
      },
      {
        id: 'create4',
        title: 'Write to a File',
        description: 'Write text to a file using echo and redirect.',
        commands: ['echo "Hello World" > hello.txt', 'cat hello.txt'],
        hint: 'Use echo with > to write to a file.',
      },
    ],
  },
  {
    id: 'moving',
    title: 'Moving & Copying',
    icon: '3',
    exercises: [
      {
        id: 'move1',
        title: 'Copy a File',
        description: 'Copy test.txt to backup.txt.',
        commands: ['cp test.txt backup.txt', 'ls'],
        hint: 'Use cp source destination.',
      },
      {
        id: 'move2',
        title: 'Rename a File',
        description: 'Rename backup.txt to test_backup.txt.',
        commands: ['mv backup.txt test_backup.txt', 'ls'],
        hint: 'Use mv to rename files.',
      },
      {
        id: 'move3',
        title: 'Move to Directory',
        description: 'Move test_backup.txt to the projects directory.',
        commands: ['mv test_backup.txt projects/', 'ls projects/'],
        hint: 'Use mv to move files between directories.',
      },
      {
        id: 'move4',
        title: 'Copy Directory',
        description: 'Copy the entire projects directory to projects_backup.',
        commands: ['cp -r projects projects_backup', 'ls'],
        hint: 'Use cp -r for directories.',
      },
    ],
  },
  {
    id: 'deleting',
    title: 'Deleting',
    icon: '4',
    exercises: [
      {
        id: 'del1',
        title: 'Delete a File',
        description: 'Delete the hello.txt file.',
        commands: ['rm hello.txt', 'ls'],
        hint: 'Use rm to delete files.',
      },
      {
        id: 'del2',
        title: 'Delete a Directory',
        description: 'Remove the empty practice directory.',
        commands: ['cd ~', 'rmdir practice', 'ls'],
        hint: 'Use rmdir for empty directories.',
      },
      {
        id: 'del3',
        title: 'Force Delete',
        description: 'Remove the projects_backup directory and all its contents.',
        commands: ['rm -rf projects_backup', 'ls'],
        hint: 'Use rm -rf for non-empty directories. Be careful!',
      },
      {
        id: 'del4',
        title: 'Clean Up',
        description: 'Remove all test files and verify everything is clean.',
        commands: ['rm -rf projects', 'ls -la'],
        hint: 'Use rm -rf to remove everything.',
      },
    ],
  },
  {
    id: 'processes',
    title: 'Process Management',
    icon: '5',
    exercises: [
      {
        id: 'proc1',
        title: 'List Processes',
        description: 'See all running processes on your system.',
        commands: ['ps aux'],
        hint: 'Use ps aux to see all processes.',
      },
      {
        id: 'proc2',
        title: 'Start a Background Process',
        description: 'Start a sleep command in the background and find it.',
        commands: ['sleep 600 &', 'ps aux | grep sleep'],
        hint: 'Use & to run in background, then find it with ps.',
      },
      {
        id: 'proc3',
        title: 'Kill a Process',
        description: 'Find the sleep process PID and kill it.',
        commands: ['ps aux | grep sleep | grep -v grep', 'kill <PID>', 'ps aux | grep sleep'],
        hint: 'Find the PID number, then use kill <PID>.',
      },
      {
        id: 'proc4',
        title: 'Monitor Resources',
        description: 'Use top to see real-time process activity.',
        commands: ['top -bn1 | head -20'],
        hint: 'Use top -bn1 for non-interactive mode.',
      },
    ],
  },
];

export function LinuxLab() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const level = LEVELS[currentLevel];
  const exercise = level?.exercises[currentExercise];

  const handleComplete = () => {
    if (exercise) {
      setCompleted(prev => new Set([...prev, exercise.id]));
      if (currentExercise < level.exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else if (currentLevel < LEVELS.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setCurrentExercise(0);
      }
    }
  };

  const isCompleted = (id: string) => completed.has(id);
  const totalExercises = LEVELS.reduce((sum, l) => sum + l.exercises.length, 0);
  const completedCount = completed.size;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar - Exercises */}
      <div className="w-full lg:w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent" />
            Linux Terminal Lab
          </h2>
          <p className="text-xs text-gray-500 mt-1">{completedCount}/{totalExercises} exercises completed</p>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(completedCount / totalExercises) * 100}%` }} />
          </div>
        </div>

        {LEVELS.map((lvl, lIdx) => (
          <div key={lvl.id} className="border-b border-gray-100">
            <button
              onClick={() => { setCurrentLevel(lIdx); setCurrentExercise(0); }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 ${currentLevel === lIdx ? 'bg-accent/5' : 'hover:bg-gray-50'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentLevel === lIdx ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>{lvl.icon}</span>
              <span className={`text-sm font-semibold ${currentLevel === lIdx ? 'text-accent' : 'text-gray-700'}`}>{lvl.title}</span>
            </button>
            {currentLevel === lIdx && (
              <div className="px-4 pb-2">
                {lvl.exercises.map((ex, eIdx) => (
                  <button
                    key={ex.id}
                    onClick={() => setCurrentExercise(eIdx)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${currentExercise === eIdx ? 'bg-accent/10 text-accent' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {isCompleted(ex.id) ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                    )}
                    <span className="truncate">{ex.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Exercise Header */}
        {exercise && (
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900">{exercise.title}</h3>
              <button
                onClick={handleComplete}
                disabled={isCompleted(exercise.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${isCompleted(exercise.id) ? 'bg-emerald-100 text-emerald-700' : 'bg-accent text-white hover:bg-accent-dark'}`}
              >
                {isCompleted(exercise.id) ? 'Completed' : 'Mark Done'}
              </button>
            </div>
            <p className="text-sm text-gray-600">{exercise.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {exercise.commands.map((cmd, i) => (
                <code key={i} className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-700">{cmd}</code>
              ))}
            </div>
            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">Need a hint?</summary>
              <p className="text-sm text-gray-600 mt-1 bg-gray-50 rounded-lg p-2">{exercise.hint}</p>
            </details>
          </div>
        )}

        {/* Terminal */}
        <div className="flex-1 overflow-hidden">
          <TerminalLab />
        </div>

        {/* Navigation */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentExercise > 0) setCurrentExercise(currentExercise - 1);
              else if (currentLevel > 0) {
                setCurrentLevel(currentLevel - 1);
                setCurrentExercise(LEVELS[currentLevel - 1].exercises.length - 1);
              }
            }}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-xs text-gray-400">
            Level {currentLevel + 1}/{LEVELS.length} - Exercise {currentExercise + 1}/{level?.exercises.length}
          </span>
          <button
            onClick={handleComplete}
            className="flex items-center gap-1 px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent-dark"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
