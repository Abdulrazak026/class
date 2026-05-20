import React from 'react';
import { FolderGit2, Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCurriculum } from '../utils/dataLoader';
import { motion } from 'motion/react';

interface ProjectsProps {
  onOpenProject: (id: string) => void;
  completedTasks: string[];
}

export function Projects({ onOpenProject, completedTasks }: ProjectsProps) {
  const projects = getCurriculum().flatMap(m => m.topics.filter(t => t.type === 'project'));

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <FolderGit2 className="w-7 h-7 text-accent" />
          Your Projects
        </h2>
        <p className="text-gray-500 mt-1">Build your portfolio. Projects beat tutorial hell.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="show"
      >
        {projects.map((proj) => {
          const done = completedTasks.includes(proj.id);
          return (
            <motion.div 
              key={proj.id} 
              onClick={() => onOpenProject(proj.id)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-accent/30 transition-all cursor-pointer flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  done ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-accent/5 text-accent border border-accent/20'
                }`}>
                  <FolderGit2 className="w-6 h-6" />
                </div>
                {done && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg">{proj.title}</h3>
              <p className="text-gray-500 text-sm mt-3 line-clamp-3 flex-1">{proj.description}</p>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-medium text-gray-400">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {proj.duration}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500/70" /> Project</span>
                </div>
                <ArrowRight className="w-4 h-4 text-accent" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}