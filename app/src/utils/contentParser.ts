import { ParsedClasswork } from '../components/ClassworkCard';

export interface ParsedCheckpoint {
  question: string;
  options: string[];
  correctIndex: number;
}

export type DirectiveType = 'checkpoint' | 'info' | 'warning' | 'tip' | 'danger' | 'success' | 'objectives' | 'concept' | 'steps' | 'summary' | 'classwork';

export interface ContentSegment {
  type: 'markdown' | DirectiveType;
  value: string;
  checkpoint?: ParsedCheckpoint;
  classwork?: ParsedClasswork;
  meta?: string;
}

function parseCheckpointBody(block: string): ParsedCheckpoint {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l);
  const question = lines[0] || '';
  const options: string[] = [];
  let correctIndex = -1;
  for (const line of lines.slice(1)) {
    const optMatch = line.match(/^([A-D]\))\s(.+)/);
    if (optMatch) options.push(optMatch[2]);
    const correctMatch = line.match(/^Correct:\s*([A-D])/i);
    if (correctMatch) {
      const idx = correctMatch[1].toUpperCase().charCodeAt(0) - 65;
      if (idx >= 0 && idx < options.length) correctIndex = idx;
    }
  }
  return { question, options, correctIndex };
}

export function parseContentDirectives(content: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  const directiveRegex = /:::(\w+)(?:\s+(.+?))?\n([\s\S]*?):::/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = directiveRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', value: content.slice(lastIndex, match.index).trim() });
    }

    const directive = match[1] as DirectiveType;
    const meta = match[2]?.trim() || '';
    const body = match[3].trim();

    if (directive === 'checkpoint') {
      segments.push({
        type: 'checkpoint',
        value: body,
        checkpoint: parseCheckpointBody(body),
      });
    } else if (['info', 'warning', 'tip', 'danger', 'success', 'objectives', 'concept', 'steps', 'summary'].includes(directive)) {
      segments.push({ type: directive, value: body, meta });
    } else {
      segments.push({ type: 'markdown', value: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: 'markdown', value: content.slice(lastIndex).trim() });
  }

  return segments.filter(s => s.value || s.checkpoint || s.classwork);
}
